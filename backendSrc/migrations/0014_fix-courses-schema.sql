-- Migration number: 0014 	 2025-11-20T08:25:18.955Z
ALTER TABLE courses_table RENAME TO courses_table_old;

CREATE TABLE courses_table (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  language text NOT NULL,
  level text NOT NULL,
  description text NOT NULL,
  name text NOT NULL,
  modules text NOT NULL,
  published boolean NOT NULL DEFAULT 0
);

INSERT INTO courses_table (id, language, level, description, name, modules, published)
SELECT
  id,
  language,
  level,
  description,

  'Курс ' || CAST(id + 1 AS TEXT) AS name,

  modules,
  published
FROM courses_table_old;

DROP TABLE courses_table_old;