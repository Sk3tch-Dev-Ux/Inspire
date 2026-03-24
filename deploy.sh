#!/bin/bash
# ===========================================
# Inspire PC - Deployment Script
# Run this on your VPS after cloning the repo
# ===========================================

set -e

echo "=== Inspire PC Deployment ==="
echo ""

# ---- Step 1: Build & start the container ----
echo "[1/4] Building and starting Docker container..."
docker compose up -d --build
echo "  ✓ Container running on 127.0.0.1:3000"
echo ""

# ---- Step 2: Set up SSL directory ----
echo "[2/4] Setting up SSL certificate directory..."
sudo mkdir -p /etc/ssl/inspirepc.com
echo "  ✓ Directory created at /etc/ssl/inspirepc.com"
echo ""
echo "  !! IMPORTANT: You need to add your Cloudflare Origin Certificate:"
echo "     1. Go to Cloudflare → inspirepc.com → SSL/TLS → Origin Server"
echo "     2. Click 'Create Certificate'"
echo "     3. Save the certificate to:  /etc/ssl/inspirepc.com/origin.pem"
echo "     4. Save the private key to:  /etc/ssl/inspirepc.com/origin-key.pem"
echo "     5. Set permissions: sudo chmod 600 /etc/ssl/inspirepc.com/origin-key.pem"
echo ""

# ---- Step 3: Install Nginx config ----
echo "[3/4] Installing Nginx configuration..."
sudo cp nginx/inspirepc.com.conf /etc/nginx/sites-available/inspirepc.com
sudo ln -sf /etc/nginx/sites-available/inspirepc.com /etc/nginx/sites-enabled/inspirepc.com

echo "  Testing Nginx config..."
if sudo nginx -t 2>&1; then
    echo "  ✓ Nginx config is valid"
else
    echo "  ✗ Nginx config has errors - fix before reloading!"
    exit 1
fi
echo ""

# ---- Step 4: Reload Nginx ----
echo "[4/4] Reloading Nginx..."
sudo systemctl reload nginx
echo "  ✓ Nginx reloaded"
echo ""

# ---- Done ----
echo "=== Deployment Complete ==="
echo ""
echo "Next steps:"
echo "  1. Add Cloudflare Origin Certificate (see Step 2 above)"
echo "  2. In Cloudflare DNS, add an A record:"
echo "     Name: @    Value: <your-vps-ip>    Proxy: ON (orange cloud)"
echo "     Name: www  Value: <your-vps-ip>    Proxy: ON (orange cloud)"
echo "  3. In Cloudflare SSL/TLS, set mode to 'Full (Strict)'"
echo "  4. Visit https://inspirepc.com to verify"
echo ""
echo "Useful commands:"
echo "  docker compose logs -f        # View container logs"
echo "  docker compose restart         # Restart the container"
echo "  docker compose up -d --build   # Rebuild after code changes"
