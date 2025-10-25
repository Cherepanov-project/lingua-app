-- Migration number: 0009
CREATE TABLE listening_exercises
(
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT NOT NULL,
    level       TEXT NOT NULL,
    image_url   TEXT NOT NULL,
    audio_url   TEXT NOT NULL,
    questions   JSON NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_listening_progress
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     TEXT NOT NULL,
    exercise_id TEXT NOT NULL,
    progress INTEGER DEFAULT 0,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exercise_id) REFERENCES listening_exercises (id)
);

INSERT
OR REPLACE INTO listening_exercises (id, name, description, level, image_url, audio_url, questions) VALUES
('1', 'Basic Listening', 'Listen to simple dialogues', 'Beginner', 'https://example.com/image1.jpg', 'https://example.com/audio1.mp3', '[{"question": "What is the main topic?", "options": ["A", "B", "C"], "correct": "A"}]'),
('2', 'Advanced Listening', 'Complex conversations', 'Advanced', 'https://example.com/image2.jpg', 'https://example.com/audio2.mp3', '[{"question": "Who is speaking?", "options": ["X", "Y", "Z"], "correct": "X"}]');