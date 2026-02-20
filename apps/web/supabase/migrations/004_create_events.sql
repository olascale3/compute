CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  api_key_id UUID REFERENCES api_keys(id),
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  input_tokens INTEGER NOT NULL DEFAULT 0,
  output_tokens INTEGER NOT NULL DEFAULT 0,
  total_tokens INTEGER GENERATED ALWAYS AS (input_tokens + output_tokens) STORED,
  cost_usd NUMERIC(12, 8) NOT NULL DEFAULT 0,
  latency_ms INTEGER,
  status_code INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_events_org_created ON events(org_id, created_at DESC);
CREATE INDEX idx_events_org_provider ON events(org_id, provider, created_at DESC);
CREATE INDEX idx_events_org_model ON events(org_id, model, created_at DESC);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Events are inserted via service role key (server-side)
-- Dashboard reads also via service role after auth check
