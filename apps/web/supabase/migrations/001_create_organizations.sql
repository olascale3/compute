CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  stripe_customer_id TEXT,
  monthly_query_limit INTEGER NOT NULL DEFAULT 1000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own org"
  ON organizations FOR SELECT
  USING (
    id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Owners can update their org"
  ON organizations FOR UPDATE
  USING (
    id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND role = 'owner')
  );
