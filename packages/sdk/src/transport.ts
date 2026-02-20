import { TrueComputeConfig, TelemetryEvent, DEFAULTS } from './types';

export class Transport {
  private queue: TelemetryEvent[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private endpoint: string;
  private apiKey: string;
  private batchSize: number;
  private flushIntervalMs: number;
  private debug: boolean;
  private onError?: (error: Error) => void;

  constructor(config: TrueComputeConfig) {
    this.endpoint = config.endpoint ?? DEFAULTS.endpoint;
    this.apiKey = config.apiKey;
    this.batchSize = config.batchSize ?? DEFAULTS.batchSize;
    this.flushIntervalMs = config.flushIntervalMs ?? DEFAULTS.flushIntervalMs;
    this.debug = config.debug ?? DEFAULTS.debug;
    this.onError = config.onError;
  }

  enqueue(event: TelemetryEvent): void {
    this.queue.push(event);

    if (this.queue.length >= this.batchSize) {
      void this.flush();
    } else if (!this.timer) {
      this.timer = setTimeout(() => void this.flush(), this.flushIntervalMs);
    }
  }

  async flush(): Promise<void> {
    if (this.queue.length === 0) return;

    const batch = this.queue.splice(0);
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ events: batch }),
        signal: AbortSignal.timeout(10_000),
      });

      if (this.debug) {
        console.log(`[TrueCompute] Flushed ${batch.length} events — ${res.status}`);
      }
    } catch (err) {
      if (this.debug) {
        console.error('[TrueCompute] Flush failed:', err);
      }
      this.onError?.(err as Error);
    }
  }

  async shutdown(): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    await this.flush();
  }
}
