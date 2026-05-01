-- Migration: 0003_discord_integration
-- Tables that back the custom Inspire Discord bot.
-- See docs/DISCORD-BOT-ARCHITECTURE.md for the full spec.

BEGIN;

-- Maps a Discord user ID to a website user/customer.
CREATE TABLE IF NOT EXISTS discord_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    discord_user_id TEXT UNIQUE NOT NULL,
    discord_handle TEXT NOT NULL,
    linked_via TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_discord_links_user ON discord_links(user_id);

-- Quote tickets opened via /quote command.
CREATE TABLE IF NOT EXISTS quote_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discord_user_id TEXT NOT NULL,
    forum_thread_id TEXT NOT NULL,
    platform TEXT,
    scope_summary TEXT,
    budget_band TEXT,
    deadline TEXT,
    status TEXT NOT NULL DEFAULT 'open',
    contracted_order_id TEXT REFERENCES orders(order_id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_quote_tickets_status ON quote_tickets(status);
CREATE INDEX IF NOT EXISTS idx_quote_tickets_discord ON quote_tickets(discord_user_id);

-- Per-user referral codes for alumni.
CREATE TABLE IF NOT EXISTS referral_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    code TEXT UNIQUE NOT NULL,
    referee_order_id TEXT REFERENCES orders(order_id) ON DELETE SET NULL,
    redeemed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_referral_codes_referrer ON referral_codes(referrer_user_id);

-- Source of truth for #availability pinned embed.
CREATE TABLE IF NOT EXISTS availability_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    week_starting DATE UNIQUE NOT NULL,
    open_slot_count INTEGER NOT NULL DEFAULT 0,
    note TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Active project channels mapped to clients/orders.
CREATE TABLE IF NOT EXISTS project_channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT UNIQUE REFERENCES orders(order_id) ON DELETE SET NULL,
    discord_channel_id TEXT UNIQUE NOT NULL,
    client_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    project_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_project_channels_status ON project_channels(status);

-- Audit log for every flow execution.
CREATE TABLE IF NOT EXISTS flow_log (
    id BIGSERIAL PRIMARY KEY,
    flow_name TEXT NOT NULL,
    actor_id TEXT,
    target_id TEXT,
    payload JSONB,
    success BOOLEAN NOT NULL,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_flow_log_created ON flow_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_flow_log_flow ON flow_log(flow_name, created_at DESC);

-- Delayed jobs (referral DM at +7 days, etc.).
CREATE TABLE IF NOT EXISTS delayed_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    run_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    error_message TEXT
);
CREATE INDEX IF NOT EXISTS idx_delayed_jobs_pending
    ON delayed_jobs(run_at) WHERE completed_at IS NULL;

-- In-memory replay protection backed by DB for multi-instance safety.
-- Discord retries signed interactions; we ignore duplicates within 60s.
CREATE TABLE IF NOT EXISTS interaction_replay (
    interaction_id TEXT PRIMARY KEY,
    seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_interaction_replay_seen ON interaction_replay(seen_at);

COMMIT;
