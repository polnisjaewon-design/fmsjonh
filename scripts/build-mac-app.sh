#!/usr/bin/env bash
set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_NAME="FMS Management"
APP_BUNDLE_DIR="$REPO_DIR/dist/$APP_NAME.app"
LOGO_SOURCE="$REPO_DIR/public/uploads/logos/956ee048-7b09-438d-ab74-ce6e550deddc-logo-1789097203509-d88464a9f980.png"

echo "=== Building macOS Application: $APP_NAME ==="

# 1. Prepare dist directory
rm -rf "$REPO_DIR/dist"
mkdir -p "$APP_BUNDLE_DIR/Contents/MacOS"
mkdir -p "$APP_BUNDLE_DIR/Contents/Resources"

# 2. Generate Apple .icns iconset
ICONSET_DIR="$REPO_DIR/dist/AppIcon.iconset"
mkdir -p "$ICONSET_DIR"

# Pad/crop logo to square 1024x1024 base
TEMP_SQUARE="$REPO_DIR/dist/icon_square.png"
sips -c 1255 1255 "$LOGO_SOURCE" --out "$TEMP_SQUARE" > /dev/null
sips -z 1024 1024 "$TEMP_SQUARE" --out "$TEMP_SQUARE" > /dev/null

sips -z 16 16     "$TEMP_SQUARE" --out "$ICONSET_DIR/icon_16x16.png" > /dev/null
sips -z 32 32     "$TEMP_SQUARE" --out "$ICONSET_DIR/icon_16x16@2x.png" > /dev/null
sips -z 32 32     "$TEMP_SQUARE" --out "$ICONSET_DIR/icon_32x32.png" > /dev/null
sips -z 64 64     "$TEMP_SQUARE" --out "$ICONSET_DIR/icon_32x32@2x.png" > /dev/null
sips -z 128 128   "$TEMP_SQUARE" --out "$ICONSET_DIR/icon_128x128.png" > /dev/null
sips -z 256 256   "$TEMP_SQUARE" --out "$ICONSET_DIR/icon_128x128@2x.png" > /dev/null
sips -z 256 256   "$TEMP_SQUARE" --out "$ICONSET_DIR/icon_256x256.png" > /dev/null
sips -z 512 512   "$TEMP_SQUARE" --out "$ICONSET_DIR/icon_256x256@2x.png" > /dev/null
sips -z 512 512   "$TEMP_SQUARE" --out "$ICONSET_DIR/icon_512x512.png" > /dev/null
sips -z 1024 1024 "$TEMP_SQUARE" --out "$ICONSET_DIR/icon_512x512@2x.png" > /dev/null

iconutil -c icns "$ICONSET_DIR" -o "$APP_BUNDLE_DIR/Contents/Resources/AppIcon.icns"
rm -rf "$ICONSET_DIR" "$TEMP_SQUARE"

echo "✔ Icon created successfully"

# 3. Create Info.plist
cat << 'PLIST_EOF' > "$APP_BUNDLE_DIR/Contents/Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>FMS Management</string>
    <key>CFBundleIconFile</key>
    <string>AppIcon</string>
    <key>CFBundleIdentifier</key>
    <string>th.ac.mcu.fms.management</string>
    <key>CFBundleName</key>
    <string>FMS Management</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSMinimumSystemVersion</key>
    <string>12.0</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
PLIST_EOF

# 4. Create Launcher Script in Contents/MacOS/FMS Management
cat << 'LAUNCHER_EOF' > "$APP_BUNDLE_DIR/Contents/MacOS/FMS Management"
#!/bin/bash
export PATH="/Applications/Docker.app/Contents/Resources/bin:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

APP_DIR="/Users/mac/Documents/fms- jonh"
PORT=3010
URL="http://localhost:$PORT"

# Check if port 3010 is responding
if ! curl -s --max-time 2 "$URL" > /dev/null 2>&1; then
    osascript -e 'display notification "กำลังสตาร์ทระบบฐานข้อมูลและเซิร์ฟเวอร์ FMS..." with title "FMS Management" sound name "Glass"'
    
    if [ -d "$APP_DIR" ]; then
        cd "$APP_DIR" && docker compose --env-file .env.docker up -d > /dev/null 2>&1
    fi
    
    MAX_WAIT=30
    WAIT_COUNT=0
    while ! curl -s --max-time 2 "$URL" > /dev/null 2>&1; do
        sleep 1
        WAIT_COUNT=$((WAIT_COUNT + 1))
        if [ $WAIT_COUNT -ge $MAX_WAIT ]; then
            osascript -e 'display alert "ไม่สามารถเริ่มระบบได้" message "กรุณาตรวจสอบว่า Docker Desktop เปิดอยู่หรือไม่"'
            exit 1
        fi
    done
fi

PROFILE_DIR="$HOME/Library/Application Support/FMS-Management-Profile"
mkdir -p "$PROFILE_DIR"

if [ -f "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
        --app="$URL" \
        --user-data-dir="$PROFILE_DIR" \
        --no-first-run \
        --no-default-browser-check > /dev/null 2>&1 &
elif [ -f "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" ]; then
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
        --app="$URL" \
        --user-data-dir="$PROFILE_DIR" > /dev/null 2>&1 &
else
    open "$URL"
fi

exit 0
LAUNCHER_EOF

chmod +x "$APP_BUNDLE_DIR/Contents/MacOS/FMS Management"

echo "✔ Application bundle created at: $APP_BUNDLE_DIR"

# 5. Copy to user's /Applications
INSTALL_TARGET="/Applications/$APP_NAME.app"
rm -rf "$INSTALL_TARGET"
cp -R "$APP_BUNDLE_DIR" "$INSTALL_TARGET"

echo "✔ Installed to $INSTALL_TARGET"
echo "=== Build Complete! ==="
