-- Migration number: 0004 	 2025-10-19T20:09:40.321Z
CREATE TABLE languages_table (
  label text NOT NULL,
  code text NOT NULL,
  emoji text NOT NULL
);
INSERT INTO languages_table (label, code, emoji) VALUES ('Английский', 'en', '🇬🇧'), ('Русский', 'ru', '🇷🇺'), ('Французский', 'fr', '🇫🇷'), ('Немецкий', 'de', '🇩🇪'), ('Турецкий', 'tr', '🇹🇷'), ('Испанский', 'es', '🇪🇸'), ('Итальянский', 'it', '🇮🇹'), ('Португальский', 'pt', '🇵🇹'), ('Китайский', 'zh', '🇨🇳'), ('Японский', 'ja', '🇯🇵'), ('Корейский', 'ko', '🇰🇷'), ('Иврит', 'he', '🇮🇱'), ('Арабский', 'ar', '🇸🇦');