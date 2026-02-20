CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  monthly_limit_usd NUMERIC(10, 2) NOT NULL,
  alert_threshold_pct INTEGER NOT NULL DEFAULT 80,
  alert_email TEXT,
  last_alerted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id)
);

ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view their org budget"
  ON budgets FOR SELECT
  USING (
    org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage budget"
  ON budgets FOR ALL
  USING (
    org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND role IN ('owner', 'admin'))
  );
