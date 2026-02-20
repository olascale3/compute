import { Transport } from '../transport';
import { TrueComputeConfig, TelemetryEvent } from '../types';

export function isAnthropicClient(client: unknown): boolean {
  return (
    client !== null &&
    typeof client === 'object' &&
    'messages' in (client as Record<string, unknown>) &&
    typeof (client as Record<string, unknown>).messages === 'object'
  );
}

export function wrapAnthropic<T>(client: T, transport: Transport, config: TrueComputeConfig): T {
  return new Proxy(client as object, {
    get(target, prop, receiver) {
      if (prop === 'messages') {
        const messages = Reflect.get(target, prop, receiver) as Record<string, unknown>;
        return new Proxy(messages, {
          get(msgTarget, msgProp) {
            if (msgProp === 'create') {
              const originalCreate = Reflect.get(msgTarget, msgProp) as Function;
              return async function wrappedCreate(this: unknown, ...args: unknown[]) {
                const start = performance.now();
                const params = args[0] as Record<string, unknown> | undefined;
                try {
                  const result = await originalCreate.apply(msgTarget, args);
                  const latency = performance.now() - start;

                  const res = result as Record<string, unknown>;
                  const usage = res?.usage as Record<string, number> | undefined;

                  const event: TelemetryEvent = {
                    provider: 'anthropic',
                    model: res?.model as string || params?.model as string || 'unknown',
                    input_tokens: usage?.input_tokens ?? 0,
                    output_tokens: usage?.output_tokens ?? 0,
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
                    provider: 'anthropic',
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
            return Reflect.get(msgTarget, msgProp);
          },
        });
      }
      return Reflect.get(target, prop, receiver);
    },
  }) as T;
}
