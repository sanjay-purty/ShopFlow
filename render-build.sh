#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Starting Render build..."
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

echo "Installing backend dependencies..."
cd backend
npm install

echo "Installing frontend dependencies..."
cd ../frontend
npm install

echo "Building frontend..."
npm run build

echo "Build process completed successfully!"
