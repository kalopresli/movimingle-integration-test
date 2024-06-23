#!/bin/bash
echo "Script started..."
# Wait for Cassandra to be fully ready
until cqlsh cassandra 9042 -e "SELECT now() FROM system.local"; do
    echo "Waiting for Cassandra to be ready..."
    sleep 10
done

echo "Cassandra is ready. Checking and creating keyspace if needed..."
# Create the keyspace if it doesn't exist
cqlsh cassandra 9042 -e "CREATE KEYSPACE IF NOT EXISTS spring_cassandra WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};"
echo "Keyspace check and creation complete."
