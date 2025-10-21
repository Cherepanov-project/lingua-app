-- Migration number: 0007 	 2025-10-20T11:01:52.237Z
CREATE TABLE modules_table (
  id text PRIMARY KEY,
  name text NOT NULL,
  lessons text NOT NULL
);
INSERT INTO modules_table (id, name, lessons) VALUES ('39da', 'Starter Guide', '["1abd"]'), ('EkwC6lJ', 'fjhfhgkj', '[]');