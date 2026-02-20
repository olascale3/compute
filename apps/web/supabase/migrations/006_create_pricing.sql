CREATE TABLE pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  display_name TEXT NOT NULL,
  input_price_per_1m NUMERIC(10, 4) NOT NULL,
  output_price_per_1m NUMERIC(10, 4) NOT NULL,
  effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
  deprecated_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(provider, model, effective_date)
);

CREATE INDEX idx_pricing_lookup ON pricing(provider, model, effective_date DESC);
