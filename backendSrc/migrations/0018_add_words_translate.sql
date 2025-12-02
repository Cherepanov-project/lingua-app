-- Migration number: 0018 	 2025-12-01T23:30:40.317Z
CREATE TABLE words_translate (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  level TEXT NOT NULL,
  words_ru TEXT NOT NULL,
  words_en TEXT NOT NULL
);

INSERT INTO words_translate (level, words_ru, words_en) VALUES
('A1', '["книга", "дом", "вода", "яблоко", "школа"]', '["book", "house", "water", "apple", "school"]'),
('A2', '["картинка", "здание", "утро", "каникулы", "учитель"]', '["picture", "building", "morning", "holiday", "teacher"]'),
('B1', '["решение", "улучшать", "комфортный", "мнение", "готовиться"]', '["decision", "improve", "comfortable", "opinion", "prepare"]'),
('B2', '["вызов", "эффективный", "требование", "поддерживать", "решение"]', '["challenge", "efficient", "requirement", "maintain", "solution"]'),
('C1', '["комплексный", "перспектива", "интерпретация", "значимый", "альтернатива"]', '["comprehensive", "perspective", "interpretation", "significant", "alternative"]'),
('C2', '["утончённый", "последствие", "феномен", "импликация", "признание"]', '["sophisticated", "consequence", "phenomenon", "implication", "acknowledgment"]');
