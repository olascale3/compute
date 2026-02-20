CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Default',
  key_prefix TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  last_used_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_api_keys_hash ON api_keys(key_hash) WHERE revoked_at IS NULL;

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view their org keys"
  ON api_keys FOR SELECT
  USING (
    org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage keys"
  ON api_keys FOR ALL
  USING (
    org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND role IN ('owner', 'admin'))
  );
