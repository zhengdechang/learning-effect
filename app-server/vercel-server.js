const http = require('http');
const egg = require('egg');

const server = http.createServer((req, res) => {
  // 启动 Egg.js
  const app = egg.start({
    baseDir: __dirname,
    mode: 'cluster',
    port: process.env.PORT || 7001,
  });

  // 将请求转发给 Egg.js
  app.callback()(req, res);
});

server.listen(process.env.PORT || 3000);
