#!/bin/bash
# ===========================================
# Inspire PC - VPS Deployment Script
# ===========================================
# Prerequisites:
#   - Docker and Docker Compose installed
#   - .env file with all required variables (see .env.example)
#   - Citadel Nginx container connected to inspire_default network
#     (run once: docker network connect inspire_default docker-nginx-1)

set -e

echo "=== Inspire PC Deployment ==="
echo ""

# Check .env exists
if [ ! -f .env ]; then
  echo "ERROR: .env file not found. Copy .env.example and fill in values:"
  echo "  cp .env.example .env"
  exit 1
fi

# Build and start containers
echo "[1/2] Building and starting containers..."
docker compose down
docker compose up -d --build
echo "  Done. Waiting for services to be healthy..."

# Wait for postgres
echo -n "  Postgres: "
for i in $(seq 1 30); do
  if docker exec inspire-postgres pg_isready -U inspire > /dev/null 2>&1; then
    echo "ready"
    break
  fi
  echo -n "."
  sleep 1
done

# Wait for web
echo -n "  Web: "
for i in $(seq 1 60); do
  if docker exec inspire-web wget --no-verbose --tries=1 --spider http://localhost:3000/ > /dev/null 2>&1; then
    echo "ready"
    break
  fi
  echo -n "."
  sleep 2
done

echo ""

# Ensure Nginx can reach Inspire
echo "[2/2] Ensuring Nginx network connectivity..."
if docker network connect inspire_default docker-nginx-1 2>/dev/null; then
  echo "  Connected Nginx to inspire network"
  echo "  Reloading Nginx config..."
  docker exec docker-nginx-1 nginx -s reload
else
  echo "  Already connected"
fi

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "Verify: curl -I http://inspirepc.com"
echo ""
echo "Useful commands:"
echo "  docker compose logs -f inspire-web    # View web logs"
echo "  docker compose logs -f postgres       # View DB logs"
echo "  docker compose restart inspire-web    # Restart web"
echo "  docker compose up -d --build          # Rebuild"
