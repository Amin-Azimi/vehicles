-- Create Vehicles Table
CREATE TABLE IF NOT EXISTS "vehicles" (
  "id"  INTEGER NOT NULL,
  "make" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "state"  TEXT NOT NULL,

  PRIMARY KEY ("id")
);

-- Seed Vehicles
INSERT INTO "vehicles" (id, make, model, state) VALUES (1, 'BMW',  'X1',   'quoted');
INSERT INTO "vehicles" (id, make, model, state) VALUES (2, 'AUDI', 'A4',   'selling');
INSERT INTO "vehicles" (id, make, model, state) VALUES (3, 'VW',   'GOLF', 'sold');

-- Create StateLogs Table
CREATE TABLE IF NOT EXISTS "stateLogs" (
  "vehicleId"  INTEGER NOT NULL,
  "state" TEXT NOT NULL,
  "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL
);

INSERT INTO "stateLogs" ("vehicleId", state, timestamp) VALUES (1, 'quoted',  '2022-09-10 10:23:54+00');
INSERT INTO "stateLogs" ("vehicleId", state, timestamp) VALUES (2, 'quoted',  '2022-09-10 14:59:01+00');
INSERT INTO "stateLogs" ("vehicleId", state, timestamp) VALUES (2, 'selling', '2022-09-11 17:03:17+00');
INSERT INTO "stateLogs" ("vehicleId", state, timestamp) VALUES (3, 'quoted',  '2022-09-11 09:11:45+00');
INSERT INTO "stateLogs" ("vehicleId", state, timestamp) VALUES (3, 'selling', '2022-09-11 23:21:38+00');
INSERT INTO "stateLogs" ("vehicleId", state, timestamp) VALUES (3, 'sold',    '2022-09-12 12:41:41+00');