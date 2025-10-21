-- Migration number: 0005 	 2025-10-20T09:48:23.442Z
CREATE TABLE levels_table (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  label text NOT NULL
);
INSERT INTO levels_table (id, label) VALUES (0, 'A1'), (1, 'A2'), (2, 'B1'), (3, 'B2'), (4, 'C1');