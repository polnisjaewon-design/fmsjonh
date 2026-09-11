#!/usr/bin/env bash
set -e

# Ensure Docker CLI in PATH on macOS Docker Desktop
if ! command -v docker &> /dev/null; then
  if [ -d "/Applications/Docker.app/Contents/Resources/bin" ]; then
    export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"
  fi
fi

ACTION="${1:-status}"

case "$ACTION" in
  start)
    if docker ps --format '{{.Names}}' | grep -q "^fms_tunnel$"; then
      echo "✅ Cloudflare Tunnel ทำงานอยู่แล้ว"
    else
      docker rm -f fms_tunnel >/dev/null 2>&1 || true
      echo "🚀 กำลังเริ่มต้น Cloudflare Tunnel..."
      docker run -d --name fms_tunnel --network fms_production_network --restart unless-stopped cloudflare/cloudflared:latest tunnel --no-autoupdate --url http://web:3010 >/dev/null
      sleep 4
    fi
    ;;
  stop)
    echo "🛑 กำลังหยุด Cloudflare Tunnel..."
    docker rm -f fms_tunnel >/dev/null 2>&1 || true
    echo "✅ หยุด Tunnel เรียบร้อยแล้ว"
    exit 0
    ;;
  status|*)
    ;;
esac

echo "=================================================================="
echo "  🌐 FMS MCU - Cloudflare Public HTTPS Tunnel"
echo "=================================================================="

if docker ps --format '{{.Names}}' | grep -q "^fms_tunnel$"; then
  TUNNEL_URL=$(docker logs fms_tunnel 2>&1 | grep -o 'https://[^ ]*\.trycloudflare\.com' | tail -n 1)
  if [ -n "$TUNNEL_URL" ]; then
    echo "🎉 สถานะ: กำลังออนไลน์ (Active)"
    echo ""
    echo "🔗 Public HTTPS URL สำหรับส่งให้คนอื่นเข้าชม:"
    echo "   👉 $TUNNEL_URL"
    echo ""
    echo "🔑 บัญชี Super Admin สำหรับทดสอบ:"
    echo "   - Email:    admin@app.local"
    echo "   - Password: Passw0rd!vibe"
    echo "=================================================================="
  else
    echo "⏳ Tunnel กำลังเชื่อมต่อไปยังเครือข่าย Cloudflare กรุณารอสักครู่แล้วรันคำสั่งนี้ใหม่อีกครั้ง"
  fi
else
  echo "⚠️ Cloudflare Tunnel ยังไม่ได้เริ่มทำงาน"
  echo "   รันคำสั่งเพื่อเริ่ม: ./scripts/tunnel.sh start"
fi
