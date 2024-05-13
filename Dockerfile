FROM postgres:14 as motorway-test-backend
WORKDIR /app
COPY ./scripts/init.sh /docker-entrypoint-initdb.d
COPY ./scripts/dump.sql ./scripts/motorway-test-backend/dump.sql