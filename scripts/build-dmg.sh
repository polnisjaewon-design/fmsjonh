#!/usr/bin/env bash
set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_NAME="FMS Management"
DMG_NAME="FMS-Management-Mac-Installer"
DMG_SOURCE="$REPO_DIR/dist/dmg_source"
DMG_OUTPUT="$REPO_DIR/dist/$DMG_NAME.dmg"

echo "=== Building macOS .dmg Installer: $DMG_NAME ==="

rm -rf "$DMG_SOURCE" "$DMG_OUTPUT"
mkdir -p "$DMG_SOURCE"

# Copy .app bundle
cp -R "$REPO_DIR/dist/$APP_NAME.app" "$DMG_SOURCE/"

# Create symlink to /Applications
ln -s /Applications "$DMG_SOURCE/Applications"

# Create DMG
hdiutil create -volname "$APP_NAME" -srcfolder "$DMG_SOURCE" -ov -format UDZO "$DMG_OUTPUT"

rm -rf "$DMG_SOURCE"

echo "✔ DMG Installer created at: $DMG_OUTPUT"
