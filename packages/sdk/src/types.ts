export interface TrueComputeConfig {
  apiKey: string;
  endpoint?: string;
  batchSize?: number;
  flushIntervalMs?: number;
  enabled?: boolean;
  debug?: boolean;
  metadata?: Record<string, string>;
  onError?: (error: Error) => void;
}

export interface TelemetryEvent {
  provider: 'openai' | 'anthropic' | 'google';
  model: string;
  input_tokens: number;
  output_tokens: number;
  latency_ms: number;
  status_code: number;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export const DEFAULTS = {
  endpoint: 'https://truecompute.io/api/v1/events',
  batchSize: 10,
  flushIntervalMs: 5000,
  enabled: true,
  debug: false,
} as const;
