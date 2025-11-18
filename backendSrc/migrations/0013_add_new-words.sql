-- Migration number: 0011 	 2025-11-01T16:36:56.667Z
CREATE TABLE topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL
);

CREATE TABLE words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id INTEGER NOT NULL,
  ru TEXT NOT NULL,
  en TEXT NOT NULL,
  FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
);

INSERT INTO topics (id, title) VALUES
  (1, 'Еда'),
  (2, 'Путешествия'),
  (3, 'Работа'),
  (4, 'Одежда'),
  (5, 'Животные'),
  (6, 'Природа');

INSERT INTO words (topic_id, ru, en) VALUES
  (1, 'Яблоко', 'Apple'),
  (1, 'Хлеб', 'Bread'),
  (1, 'Молоко', 'Milk'),
  (1, 'Мясо', 'Meat'),

  (2, 'Билет', 'Ticket'),
  (2, 'Самолёт', 'Airplane'),
  (2, 'Отель', 'Hotel'),
  (2, 'Карта', 'Map'),

  (3, 'Офис', 'Office'),
  (3, 'Сотрудник', 'Employee'),
  (3, 'Зарплата', 'Salary'),
  (3, 'Компьютер', 'Computer'),

  (4, 'Куртка', 'Jacket'),
  (4, 'Штаны', 'Pants'),
  (4, 'Футболка', 'T-shirt'),
  (4, 'Платье', 'Dress'),

  (5, 'Кошка', 'Cat'),
  (5, 'Собака', 'Dog'),
  (5, 'Птица', 'Bird'),
  (5, 'Рыба', 'Fish'),

  (6, 'Дерево', 'Tree'),
  (6, 'Река', 'River'),
  (6, 'Гора', 'Mountain'),
  (6, 'Солнце', 'Sun');

