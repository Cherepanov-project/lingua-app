-- Migration number: 0002 	 2025-10-17T23:09:46.247Z
CREATE TABLE truthorlie_table (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  level integer NOT NULL DEFAULT 1,
  statements text NOT NULL
);
INSERT INTO truthorlie_table (id, level, statements) VALUES (0, 1, '[{ "statement": "The sky is blue", "correctValue": "true" }, { "statement": "Cats can fly", "correctValue": "false" }, { "statement": "Fish live in water", "correctValue": "true" }, { "statement": "The sun is cold", "correctValue": "false" }]'), (1, 2, '[{ "statement": "Dogs have four legs", "correctValue": "true" }, { "statement": "We eat soup with a fork", "correctValue": "false" }, { "statement": "Apples are fruits", "correctValue": "true" }, { "statement": "You wear shoes on your feet", "correctValue": "true" }, { "statement": "Fire is hot", "correctValue": "true" }]');