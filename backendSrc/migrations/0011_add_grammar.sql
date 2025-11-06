-- Migration number: 0011 	 2025-11-01T09:22:23.945Z
CREATE TABLE grammar_table (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  text TEXT NOT NULL
);

INSERT INTO grammar_table (title, slug, text) VALUES
('Present Simple', 'present-simple', 'Время Present Simple обозначает действие в настоящем в широком смысле слова. Оно употребляется для обозначения обычных, регулярно повторяющихся или постоянных действий.'),
('Past Simple', 'past-simple', 'Время Past Simple используется для обозначения действия, которое произошло в определенное время в прошлом и время совершения которого уже истекло.'),
('Future Simple', 'future-simple', 'Время Future Simple ссылается на действие, которое совершится в неопределенном или отдаленном будущем.'),
('Present Continuous', 'present-continuous', 'Время Present Continuous указывает на действие или процесс, длящийся в момент речи или в текущий период времени.'),
('Past Continuous', 'past-continuous', 'Время Past Continuous указывает на процесс, длившийся в определенный момент или период в прошлом.'),
('Future Continuous', 'future-continuous', 'Время Future Continuous указывает на процесс, который будет длиться в определенный момент в будущем.'),
('Present Perfect', 'present-perfect', 'Время Present Perfect обозначает действие, которое завершилось к настоящему моменту.'),
('Past Perfect', 'past-perfect', 'Время Past Perfect обозначает действие, которое завершилось до определенного момента в прошлом.'),
('Future Perfect', 'future-perfect', 'Время Future Perfect обозначает действие, которое закончится до определенного момента в будущем.'),
('Present Perfect Continuous', 'present-perfect-continuous', 'Времена Perfect Continuous используются для обозначения процесса, который начался и длился до момента в настоящем, прошлом или будущем.'),
('Past Perfect Continuous', 'past-perfect-continuous', 'Время Past Perfect Continuous указывает на действие, которое началось в прошлом и длилось до определённого момента.'),
('Future Perfect Continuous', 'future-perfect-continuous', 'Время Future Perfect Continuous указывает на действие, которое будет длиться до определённого момента в будущем.');