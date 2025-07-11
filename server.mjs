// const jsonServer = require('json-server');
// import jsonServer from 'json-server';
import jsonServer from 'json-server/lib/server/index.js';
const server = jsonServer.create();
const router = jsonServer.router('mock/db.json');
const middlewares = jsonServer.defaults();


server.use(middlewares);

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

  // res.json(user || {
  //   id: userId,
  //   email: "test@json-server.com",
  //   name: "JSON Server User",
  //   picture: "https://example.com/avatar.jpg"
  // });
});

server.use((req, res, next) => {
  if (!req.path.startsWith('/api/v2/users')) {
    return next();
  }
});

server.listen(3001, () => {
  console.log('JSON Server (только мок данных) работает на http://localhost:3001');
});