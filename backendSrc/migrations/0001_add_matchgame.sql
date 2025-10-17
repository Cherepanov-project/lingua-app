CREATE TABLE matchgames_table (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  level integer NOT NULL DEFAULT 1,
  pairs text NOT NULL
);
INSERT INTO matchgames_table (id, level, pairs) VALUES (0, 1, '[{ "left": "Яблоко", "right": "Apple" }, { "left": "Машина", "right": "Car" }, { "left": "Дом", "right": "House" }, { "left": "Собака", "right": "Dog" }, { "left": "Кошка", "right": "Cat" }]');