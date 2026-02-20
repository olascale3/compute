import { TrueComputeConfig, DEFAULTS } from './types';
import { Transport } from './transport';
import { isOpenAIClient, wrapOpenAI } from './wrappers/openai';
import { isAnthropicClient, wrapAnthropic } from './wrappers/anthropic';
import { isGoogleClient, wrapGoogle } from './wrappers/google';

export class TrueCompute {
  private transport: Transport;
  private config: TrueComputeConfig;
  private enabled: boolean;

  constructor(config: TrueComputeConfig) {
    this.config = config;
    this.enabled = config.enabled ?? DEFAULTS.enabled;
    this.transport = new Transport(config);
  }

  /**
   * Wrap an AI SDK client to automatically track all API calls.
   * Supports OpenAI, Anthropic, and Google Generative AI clients.
   *
   * @example
   * ```ts
   * import OpenAI from 'openai';
   * import { TrueCompute } from '@truecompute/sdk';
   *
   * const tc = new TrueCompute({ apiKey: 'tc_live_...' });
   * const openai = tc.wrap(new OpenAI());
   *
   * // Use openai as normal — all calls are tracked automatically
   * const response = await openai.chat.completions.create({ ... });
   * ```
   */
  wrap<T>(client: T): T {
    if (!this.enabled) return client;

    if (isOpenAIClient(client)) {
      return wrapOpenAI(client, this.transport, this.config);
    }

    if (isAnthropicClient(client)) {
      return wrapAnthropic(client, this.transport, this.config);
    }

    if (isGoogleClient(client)) {
      return wrapGoogle(client, this.transport, this.config);
    }

    throw new Error(
      'Unsupported AI client. TrueCompute supports OpenAI, Anthropic, and Google Generative AI SDKs.'
    );
  }

  /**
   * Flush any remaining events and shut down the transport.
   * Call this before your process exits to ensure all events are sent.
   */
  async shutdown(): Promise<void> {
    await this.transport.shutdown();
  }
}
