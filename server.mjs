import jsonServer from 'json-server';


const server = jsonServer.create();

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
  truthlie: JSON.parse(fs.readFileSync(path.join('mock', 'truthlie.json'), 'utf8')),
  stats: JSON.parse(fs.readFileSync(path.join('mock', 'stats.json'), 'utf8'))
};

const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();


server.use(middlewares);
server.use(router);

// request proxy
server.get('/api/v2/users/:userId', (req, res) => {
  const { userId } = req.params;
  const user = router.db.get('users').find({ id: userId }).value();

  if (user) {
    console.log('userId', userId)
    res.json(user);
  } else {
    console.log('mockUser')
    res.json({
      id: userId,
      email: `${userId.split('|')[1]}@auth0user.com`,
      name: "Auth0 User",
      picture: "https://example.com/default-avatar.jpg"
    });
  }

});

server.use((req, res, next) => {
  if (!req.path.startsWith('/api/v2/users')) {
    return next();
  }
});

server.listen(3001, () => {
  console.log('JSON Server (только мок данных) работает на http://localhost:3001');
});