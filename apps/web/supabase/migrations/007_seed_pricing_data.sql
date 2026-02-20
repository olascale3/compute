INSERT INTO pricing (provider, model, display_name, input_price_per_1m, output_price_per_1m) VALUES
-- OpenAI
('openai', 'gpt-4o', 'GPT-4o', 2.5000, 10.0000),
('openai', 'gpt-4o-mini', 'GPT-4o Mini', 0.1500, 0.6000),
('openai', 'gpt-4.5-preview', 'GPT-4.5 Preview', 75.0000, 150.0000),
('openai', 'gpt-4-turbo', 'GPT-4 Turbo', 10.0000, 30.0000),
('openai', 'gpt-3.5-turbo', 'GPT-3.5 Turbo', 0.5000, 1.5000),
('openai', 'o3-mini', 'o3-mini', 1.1000, 4.4000),
('openai', 'o3', 'o3', 10.0000, 40.0000),
('openai', 'o1', 'o1', 15.0000, 60.0000),
('openai', 'o1-mini', 'o1 Mini', 3.0000, 12.0000),
-- Anthropic
('anthropic', 'claude-sonnet-4-20250514', 'Claude Sonnet 4', 3.0000, 15.0000),
('anthropic', 'claude-3-5-sonnet-20241022', 'Claude 3.5 Sonnet', 3.0000, 15.0000),
('anthropic', 'claude-3-5-haiku-20241022', 'Claude 3.5 Haiku', 0.8000, 4.0000),
('anthropic', 'claude-3-haiku-20240307', 'Claude 3 Haiku', 0.2500, 1.2500),
('anthropic', 'claude-3-opus-20240229', 'Claude 3 Opus', 15.0000, 75.0000),
('anthropic', 'claude-opus-4-20250514', 'Claude Opus 4', 15.0000, 75.0000),
-- Google
('google', 'gemini-2.0-flash', 'Gemini 2.0 Flash', 0.1000, 0.4000),
('google', 'gemini-2.0-pro', 'Gemini 2.0 Pro', 1.2500, 10.0000),
('google', 'gemini-1.5-pro', 'Gemini 1.5 Pro', 1.2500, 5.0000),
('google', 'gemini-1.5-flash', 'Gemini 1.5 Flash', 0.0750, 0.3000),
-- DeepSeek
('deepseek', 'deepseek-chat', 'DeepSeek V3', 0.2700, 1.1000),
('deepseek', 'deepseek-reasoner', 'DeepSeek R1', 0.5500, 2.1900),
-- Mistral
('mistral', 'mistral-large-latest', 'Mistral Large', 2.0000, 6.0000),
('mistral', 'mistral-small-latest', 'Mistral Small', 0.1000, 0.3000);
