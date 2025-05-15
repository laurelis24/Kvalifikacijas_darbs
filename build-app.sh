#!/bin/bash
# Make sure this file has executable permissions, run `chmod +x build-app.sh`

# Exit the script if any command fails
set -e
set -x  # NEW: Print each command as it's run

[ -f .env ] || cp .env.example .env

# Build assets using NPM
npm run build


php artisan storage:link --force
php artisan migrate --force
