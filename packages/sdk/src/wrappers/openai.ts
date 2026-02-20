import { Transport } from '../transport';
import { TrueComputeConfig, TelemetryEvent } from '../types';

export function isOpenAIClient(client: unknown): boolean {
  return (
    client !== null &&
    typeof client === 'object' &&
    'chat' in (client as Record<string, unknown>) &&
    typeof (client as Record<string, unknown>).chat === 'object'
  );
}

export function wrapOpenAI<T>(client: T, transport: Transport, config: TrueComputeConfig): T {
  const ogClient = client as Record<string, unknown>;

  return new Proxy(client as object, {
    get(target, prop, receiver) {
      if (prop === 'chat') {
        const chat = Reflect.get(target, prop, receiver) as Record<string, unknown>;
        return new Proxy(chat, {
          get(chatTarget, chatProp) {
            if (chatProp === 'completions') {
              const completions = Reflect.get(chatTarget, chatProp) as Record<string, unknown>;
              return new Proxy(completions, {
                get(compTarget, compProp) {
                  if (compProp === 'create') {
                    const originalCreate = Reflect.get(compTarget, compProp) as Function;
                    return async function wrappedCreate(this: unknown, ...args: unknown[]) {
                      const start = performance.now();
                      const params = args[0] as Record<string, unknown> | undefined;
                      try {
                        const result = await originalCreate.apply(compTarget, args);
                        const latency = performance.now() - start;
                        const usage = (result as Record<string, unknown>)?.usage as Record<string, number> | undefined;

                        const event: TelemetryEvent = {
                          provider: 'openai',
                          model: (result as Record<string, unknown>)?.model as string || params?.model as string || 'unknown',
                          input_tokens: usage?.prompt_tokens ?? 0,
                          output_tokens: usage?.completion_tokens ?? 0,
                          latency_ms: Math.round(latency),
                          status_code: 200,
                          metadata: config.metadata ? { ...config.metadata } : undefined,
                          timestamp: new Date().toISOString(),
                        };
                        transport.enqueue(event);

                        return result;
                      } catch (err: unknown) {
                        const latency = performance.now() - start;
                        const error = err as Record<string, unknown>;
                        const event: TelemetryEvent = {
                          provider: 'openai',
                          model: params?.model as string || 'unknown',
                          input_tokens: 0,
                          output_tokens: 0,
                          latency_ms: Math.round(latency),
                          status_code: (error?.status as number) ?? 500,
                          metadata: { ...config.metadata, error: (error?.message as string) ?? 'unknown' },
                          timestamp: new Date().toISOString(),
                        };
                        transport.enqueue(event);
                        throw err;
                      }
                    };
                  }
                  return Reflect.get(compTarget, compProp);
                },
              });
            }
            return Reflect.get(chatTarget, chatProp);
          },
        });
      }

      // Also wrap responses.create if it exists (OpenAI Responses API)
      if (prop === 'responses') {
        const responses = Reflect.get(target, prop, receiver);
        if (!responses || typeof responses !== 'object') return responses;
        return new Proxy(responses as object, {
          get(respTarget, respProp) {
            if (respProp === 'create') {
              const originalCreate = Reflect.get(respTarget, respProp) as Function;
              return async function wrappedCreate(this: unknown, ...args: unknown[]) {
                const start = performance.now();
                const params = args[0] as Record<string, unknown> | undefined;
                try {
                  const result = await originalCreate.apply(respTarget, args);
                  const latency = performance.now() - start;
                  const usage = (result as Record<string, unknown>)?.usage as Record<string, number> | undefined;

                  transport.enqueue({
                    provider: 'openai',
                    model: (result as Record<string, unknown>)?.model as string || params?.model as string || 'unknown',
                    input_tokens: usage?.input_tokens ?? 0,
                    output_tokens: usage?.output_tokens ?? 0,
                    latency_ms: Math.round(latency),
                    status_code: 200,
                    metadata: config.metadata ? { ...config.metadata } : undefined,
                    timestamp: new Date().toISOString(),
                  });
                  return result;
                } catch (err: unknown) {
                  const latency = performance.now() - start;
                  const error = err as Record<string, unknown>;
                  transport.enqueue({
                    provider: 'openai',
                    model: params?.model as string || 'unknown',
                    input_tokens: 0,
                    output_tokens: 0,
                    latency_ms: Math.round(latency),
                    status_code: (error?.status as number) ?? 500,
                    metadata: { ...config.metadata, error: (error?.message as string) ?? 'unknown' },
                    timestamp: new Date().toISOString(),
                  });
                  throw err;
                }
              };
            }
            return Reflect.get(respTarget, respProp);
          },
        });
      }

      return Reflect.get(target, prop, receiver);
    },
  }) as T;
}
