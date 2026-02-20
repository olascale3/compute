CREATE TABLE org_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

ALTER TABLE org_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own memberships"
  ON org_members FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Owners can manage members"
  ON org_members FOR ALL
  USING (
    org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid() AND role = 'owner')
  );
