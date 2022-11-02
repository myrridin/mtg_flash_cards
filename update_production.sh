#!/usr/bin/env bash
# Update from git
git add -A
git reset HEAD --hard
git fetch
git pull --rebase

# Stop the docker compose environment
docker-compose -f docker-compose.production.yml down

# Build the docker compose environment
docker-compose -f docker-compose.production.yml build --pull

# Start docker compose for the API service
docker-compose -f docker-compose.production.yml up -d api

# Run any migrations
docker-compose -f docker-compose.production.yml exec api rails db:migrate

# Build the frontend static files
docker-compose -f docker-compose.production.yml run web yarn build

# Copy the frontend static files to the Rails service
rm -rf api/public/*
cp -R web/build/* api/public/
