export interface ModelPricing {
  provider: string;
  model: string;
  displayName: string;
  inputPer1M: number;
  outputPer1M: number;
}

export const PRICING_DATA: ModelPricing[] = [
  // OpenAI
  { provider: 'openai', model: 'gpt-4o', displayName: 'GPT-4o', inputPer1M: 2.5, outputPer1M: 10.0 },
  { provider: 'openai', model: 'gpt-4o-mini', displayName: 'GPT-4o Mini', inputPer1M: 0.15, outputPer1M: 0.6 },
  { provider: 'openai', model: 'gpt-4.5-preview', displayName: 'GPT-4.5 Preview', inputPer1M: 75.0, outputPer1M: 150.0 },
  { provider: 'openai', model: 'gpt-4-turbo', displayName: 'GPT-4 Turbo', inputPer1M: 10.0, outputPer1M: 30.0 },
  { provider: 'openai', model: 'gpt-3.5-turbo', displayName: 'GPT-3.5 Turbo', inputPer1M: 0.5, outputPer1M: 1.5 },
  { provider: 'openai', model: 'o3-mini', displayName: 'o3-mini', inputPer1M: 1.1, outputPer1M: 4.4 },
  { provider: 'openai', model: 'o3', displayName: 'o3', inputPer1M: 10.0, outputPer1M: 40.0 },
  { provider: 'openai', model: 'o1', displayName: 'o1', inputPer1M: 15.0, outputPer1M: 60.0 },
  { provider: 'openai', model: 'o1-mini', displayName: 'o1 Mini', inputPer1M: 3.0, outputPer1M: 12.0 },
  // Anthropic
  { provider: 'anthropic', model: 'claude-sonnet-4-20250514', displayName: 'Claude Sonnet 4', inputPer1M: 3.0, outputPer1M: 15.0 },
  { provider: 'anthropic', model: 'claude-3-5-sonnet-20241022', displayName: 'Claude 3.5 Sonnet', inputPer1M: 3.0, outputPer1M: 15.0 },
  { provider: 'anthropic', model: 'claude-3-5-haiku-20241022', displayName: 'Claude 3.5 Haiku', inputPer1M: 0.8, outputPer1M: 4.0 },
  { provider: 'anthropic', model: 'claude-3-haiku-20240307', displayName: 'Claude 3 Haiku', inputPer1M: 0.25, outputPer1M: 1.25 },
  { provider: 'anthropic', model: 'claude-3-opus-20240229', displayName: 'Claude 3 Opus', inputPer1M: 15.0, outputPer1M: 75.0 },
  { provider: 'anthropic', model: 'claude-opus-4-20250514', displayName: 'Claude Opus 4', inputPer1M: 15.0, outputPer1M: 75.0 },
  // Google
  { provider: 'google', model: 'gemini-2.0-flash', displayName: 'Gemini 2.0 Flash', inputPer1M: 0.1, outputPer1M: 0.4 },
  { provider: 'google', model: 'gemini-2.0-pro', displayName: 'Gemini 2.0 Pro', inputPer1M: 1.25, outputPer1M: 10.0 },
  { provider: 'google', model: 'gemini-1.5-pro', displayName: 'Gemini 1.5 Pro', inputPer1M: 1.25, outputPer1M: 5.0 },
  { provider: 'google', model: 'gemini-1.5-flash', displayName: 'Gemini 1.5 Flash', inputPer1M: 0.075, outputPer1M: 0.3 },
  // DeepSeek
  { provider: 'deepseek', model: 'deepseek-chat', displayName: 'DeepSeek V3', inputPer1M: 0.27, outputPer1M: 1.1 },
  { provider: 'deepseek', model: 'deepseek-reasoner', displayName: 'DeepSeek R1', inputPer1M: 0.55, outputPer1M: 2.19 },
  // Mistral
  { provider: 'mistral', model: 'mistral-large-latest', displayName: 'Mistral Large', inputPer1M: 2.0, outputPer1M: 6.0 },
  { provider: 'mistral', model: 'mistral-small-latest', displayName: 'Mistral Small', inputPer1M: 0.1, outputPer1M: 0.3 },
];
