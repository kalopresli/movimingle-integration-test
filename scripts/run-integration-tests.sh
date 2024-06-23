#!/bin/bash
set -e

echo "Building and starting services..."
docker-compose build
docker-compose up -d

echo "Sending test message..."
curl -f http://localhost:8080/send?message=Hello
echo "Message sent to the voting service."

echo "Waiting for log file update..."
sleep 10

echo "Verifying message in application logs..."
if [ -f ./logs/application.log ] && grep -q "Hello" ./logs/application.log; then
  echo "Message found in application logs."
else
  echo "Message not found in application logs."
  exit 1
fi

echo "Collecting logs..."
mkdir -p artifacts
cp ./logs/application.log artifacts/

echo "Cleaning up..."
docker-compose down
