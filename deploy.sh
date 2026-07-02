#!/bin/bash
set -e
cd ~/interview-prep

git stash
git pull origin master
docker compose up --build -d
echo "Deploy complete"
