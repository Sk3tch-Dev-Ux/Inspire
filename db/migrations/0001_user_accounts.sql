-- Migration: User accounts for OAuth authentication
-- Run: docker exec -i inspire-postgres psql -U inspire -d inspire < db/migrations/0001_user_accounts.sql

BEGIN;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  provider TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  provider_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider, provider_id)
);

-- Add user_id to orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

COMMIT;
