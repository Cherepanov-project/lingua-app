const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();

// Создаем объединенную базу данных из отдельных файлов
const db = {
  languages: JSON.parse(fs.readFileSync(path.join('mock', 'languages.json'), 'utf8')),
  levels: JSON.parse(fs.readFileSync(path.join('mock', 'levels.json'), 'utf8')),
  courses: JSON.parse(fs.readFileSync(path.join('mock', 'courses.json'), 'utf8')),
  modules: JSON.parse(fs.readFileSync(path.join('mock', 'modules.json'), 'utf8')),
  lessons: JSON.parse(fs.readFileSync(path.join('mock', 'lessons.json'), 'utf8')),
  exercises: JSON.parse(fs.readFileSync(path.join('mock', 'exercises.json'), 'utf8')),
  questions: JSON.parse(fs.readFileSync(path.join('mock', 'questions.json'), 'utf8')),
  users: JSON.parse(fs.readFileSync(path.join('mock', 'users.json'), 'utf8')),
  pictures: JSON.parse(fs.readFileSync(path.join('mock', 'pictures.json'), 'utf8')),
  matchgame: JSON.parse(fs.readFileSync(path.join('mock', 'matchgame.json'), 'utf8')),
  stats: JSON.parse(fs.readFileSync(path.join('mock', 'stats.json'), 'utf8'))
};

const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/api", router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
