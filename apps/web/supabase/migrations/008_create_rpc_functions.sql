-- Provider breakdown for dashboard
CREATE OR REPLACE FUNCTION get_provider_breakdown(p_org_id UUID, p_since TIMESTAMPTZ)
RETURNS TABLE(provider TEXT, total_cost NUMERIC, query_count BIGINT, avg_latency NUMERIC)
LANGUAGE SQL STABLE
AS $$
  SELECT
    provider,
    COALESCE(SUM(cost_usd), 0) as total_cost,
    COUNT(*) as query_count,
    COALESCE(AVG(latency_ms), 0) as avg_latency
  FROM events
  WHERE org_id = p_org_id AND created_at >= p_since
  GROUP BY provider
  ORDER BY total_cost DESC;
$$;

-- Daily spend for chart
CREATE OR REPLACE FUNCTION get_daily_spend(p_org_id UUID, p_since TIMESTAMPTZ)
RETURNS TABLE(date DATE, total_cost NUMERIC, query_count BIGINT)
LANGUAGE SQL STABLE
AS $$
  SELECT
    created_at::date as date,
    COALESCE(SUM(cost_usd), 0) as total_cost,
    COUNT(*) as query_count
  FROM events
  WHERE org_id = p_org_id AND created_at >= p_since
  GROUP BY created_at::date
  ORDER BY date ASC;
$$;

-- Model breakdown for dashboard
CREATE OR REPLACE FUNCTION get_model_breakdown(p_org_id UUID, p_since TIMESTAMPTZ)
RETURNS TABLE(provider TEXT, model TEXT, total_cost NUMERIC, query_count BIGINT, avg_input_tokens NUMERIC, avg_output_tokens NUMERIC, avg_latency NUMERIC)
LANGUAGE SQL STABLE
AS $$
  SELECT
    provider,
    model,
    COALESCE(SUM(cost_usd), 0) as total_cost,
    COUNT(*) as query_count,
    COALESCE(AVG(input_tokens), 0) as avg_input_tokens,
    COALESCE(AVG(output_tokens), 0) as avg_output_tokens,
    COALESCE(AVG(latency_ms), 0) as avg_latency
  FROM events
  WHERE org_id = p_org_id AND created_at >= p_since
  GROUP BY provider, model
  ORDER BY total_cost DESC;
$$;

-- Monthly spend for budget check
CREATE OR REPLACE FUNCTION get_monthly_spend(p_org_id UUID, p_since TIMESTAMPTZ)
RETURNS NUMERIC
LANGUAGE SQL STABLE
AS $$
  SELECT COALESCE(SUM(cost_usd), 0)
  FROM events
  WHERE org_id = p_org_id AND created_at >= p_since;
$$;
