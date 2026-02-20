# @truecompute/sdk

Track the true cost of every AI API call — dollars, tokens, latency.

## Quick Start

```bash
npm install @truecompute/sdk
```

```typescript
import { TrueCompute } from '@truecompute/sdk';
import OpenAI from 'openai';

const tc = new TrueCompute({ apiKey: 'tc_live_...' });
const openai = tc.wrap(new OpenAI());

// Use openai as normal — all calls tracked automatically
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello' }],
});

// TrueCompute dashboard now shows:
// Cost: $0.0043 | Tokens: 1,247 | Latency: 892ms
```

## Supported Providers

- **OpenAI** — `chat.completions.create()`, `responses.create()`
- **Anthropic** — `messages.create()`
- **Google Generative AI** — `generateContent()`

## Configuration

```typescript
const tc = new TrueCompute({
  apiKey: 'tc_live_...',           // Required
  endpoint: 'https://...',         // Custom endpoint (default: truecompute.io)
  batchSize: 10,                   // Events per batch (default: 10)
  flushIntervalMs: 5000,           // Flush interval (default: 5000ms)
  enabled: true,                   // Disable in tests (default: true)
  debug: false,                    // Log to console (default: false)
  metadata: { team: 'ml' },       // Attached to every event
  onError: (err) => {},            // Custom error handler
});
```

## Zero Latency

The SDK sends telemetry asynchronously (fire-and-forget). Your API calls are never delayed. Errors in the SDK never propagate to your application.

## Shutdown

Call `shutdown()` before your process exits to flush remaining events:

```typescript
process.on('SIGTERM', async () => {
  await tc.shutdown();
  process.exit(0);
});
```
