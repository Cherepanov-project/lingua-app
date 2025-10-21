-- Migration number: 0008 	 2025-10-20T11:41:33.732Z
CREATE TABLE lessons_table (
  id text PRIMARY KEY,
  name text NOT NULL,
  exercises text NOT NULL
);
INSERT INTO lessons_table (id, name, exercises) VALUES ('1abd', 'sdfsdfsd', '["blahblah"]');