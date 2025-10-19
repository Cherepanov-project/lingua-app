-- Migration number: 0003 	 2025-10-19T16:32:38.529Z
CREATE TABLE pictures_table (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  img text NOT NULL,
  title text NOT NULL,
  tag text NOT NULL
);
INSERT INTO pictures_table (id, img, title, tag) VALUES (0, 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', 'завтрак', 'l1'), (1, 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', 'бургер', 'l1'), (2, 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', 'камера', 'l1'), (3, 'https://avatars.mds.yandex.net/i?id=8f88a66d14b81337889819c4d9bc3e13_l-3027871-images-thumbs&n=13', 'star wars', 'starwars');