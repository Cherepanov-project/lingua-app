-- Migration number: 0015 	 2025-11-22T09:25:19.705Z
ALTER TABLE modules_table
  ADD COLUMN grammar TEXT NOT NULL DEFAULT '[]';