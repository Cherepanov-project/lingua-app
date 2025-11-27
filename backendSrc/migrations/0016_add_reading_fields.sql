-- Migration number: 0016 	 2025-11-24T10:05:42.162Z

ALTER TABLE lessons_table ADD COLUMN listening TEXT NOT NULL DEFAULT '[]';
ALTER TABLE lessons_table ADD COLUMN grammar_exercises TEXT NOT NULL DEFAULT '[]';
ALTER TABLE lessons_table ADD COLUMN orthography TEXT NOT NULL DEFAULT '[]';
ALTER TABLE lessons_table ADD COLUMN newWords TEXT NOT NULL DEFAULT '[]';
ALTER TABLE lessons_table ADD COLUMN reading TEXT NOT NULL DEFAULT '[]';