#!/usr/bin/env bash
set -e

# Ensure Docker CLI in PATH on macOS Docker Desktop
if ! command -v docker &> /dev/null; then
  if [ -d "/Applications/Docker.app/Contents/Resources/bin" ]; then
    export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"
  fi
fi

echo "=================================================================="
echo "  🚀 FMS MCU - Docker Desktop Production Deployment"
echo "=================================================================="

# 1. Check Docker Daemon
if ! docker info > /dev/null 2>&1; then
  echo "❌ ไม่พบ Docker Daemon กำลังทำงานอยู่!"
  echo "   กรุณาเปิดแอปพลิเคชัน Docker Desktop บนเครื่องของท่านก่อนรันสคริปต์นี้"
  exit 1
fi
echo "✅ Docker Desktop พร้อมทำงาน (Daemon active)"

# 2. Setup production .env if not exists
if [ ! -f ".env.docker" ]; then
  if [ -f ".env.docker.example" ]; then
    echo "📝 สร้างไฟล์ .env.docker จาก .env.docker.example..."
    cp .env.docker.example .env.docker
    RAND_SECRET=$(openssl rand -hex 32 2>/dev/null || node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" 2>/dev/null || true)
    if [ -n "$RAND_SECRET" ]; then
      sed -i.bak "s/AUTH_SECRET=.*/AUTH_SECRET=$RAND_SECRET/" .env.docker && rm -f .env.docker.bak
      echo "🔐 สร้าง AUTH_SECRET แบบสุ่มขนาด 32 bytes ให้โดยอัตโนมัติ"
    fi
  fi
fi

# 3. Stop running containers if any
echo "📦 เตรียมสภาพแวดล้อมคอนเทนเนอร์..."
docker compose --env-file .env.docker down --remove-orphans > /dev/null 2>&1 || true

# 4. Build and start containers
echo "🔨 กำลัง Build Docker Image (Multi-Stage Standalone)..."
docker compose --env-file .env.docker up --build -d

echo ""
echo "⏳ กำลังรอระบบเริ่มต้นและทดสอบความพร้อม (Healthcheck)..."
MAX_RETRIES=45
COUNT=0
HEALTHY=false

while [ $COUNT -lt $MAX_RETRIES ]; do
  STATUS=$(docker inspect --format='{{json .State.Health.Status}}' fms_nextjs_prod 2>/dev/null || echo "starting")
  if [ "$STATUS" = "\"healthy\"" ]; then
    HEALTHY=true
    break
  fi
  sleep 2
  COUNT=$((COUNT+1))
  echo -n "."
done

echo ""
if [ "$HEALTHY" = "true" ]; then
  echo "🎉 การ Deploy บน Docker Desktop สำเร็จสมบูรณ์ 100%!"
  echo ""
  docker compose --env-file .env.docker ps
  echo ""
  echo "🌐 เปิดใช้งานระบบได้ที่: http://localhost:3010"
  echo "🩺 Healthcheck Status:  http://localhost:3010/api/health"
  echo "🔑 บัญชี Super Admin:  admin@app.local / Passw0rd!vibe"
  echo "=================================================================="
else
  echo "⚠️ คอนเทนเนอร์กำลังเริ่มต้น ตรวจสอบ Logs เพิ่มเติมด้วย:"
  echo "   docker compose logs -f web"
fi
