import { Transport } from '../transport';
import { TrueComputeConfig, TelemetryEvent } from '../types';

export function isGoogleClient(client: unknown): boolean {
  return (
    client !== null &&
    typeof client === 'object' &&
    'generateContent' in (client as Record<string, unknown>) &&
    typeof (client as Record<string, unknown>).generateContent === 'function'
  );
}

export function wrapGoogle<T>(client: T, transport: Transport, config: TrueComputeConfig): T {
  return new Proxy(client as object, {
    get(target, prop, receiver) {
      if (prop === 'generateContent') {
        const originalFn = Reflect.get(target, prop, receiver) as Function;
        return async function wrappedGenerateContent(this: unknown, ...args: unknown[]) {
          const start = performance.now();
          try {
            const result = await originalFn.apply(target, args);
            const latency = performance.now() - start;

            const res = result as Record<string, unknown>;
            const response = res?.response as Record<string, unknown> | undefined;
            const usageMetadata = (response?.usageMetadata ?? res?.usageMetadata) as Record<string, number> | undefined;

            // Try to get model name from the client object
            const modelName = (target as Record<string, unknown>)?.model as string || 'unknown';

            const event: TelemetryEvent = {
              provider: 'google',
              model: modelName,
              input_tokens: usageMetadata?.promptTokenCount ?? 0,
              output_tokens: usageMetadata?.candidatesTokenCount ?? 0,
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
            const modelName = (target as Record<string, unknown>)?.model as string || 'unknown';
            const event: TelemetryEvent = {
              provider: 'google',
              model: modelName,
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
      return Reflect.get(target, prop, receiver);
    },
  }) as T;
}
