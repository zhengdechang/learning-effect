const egg = require('egg');

const workers = Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  workers,
  baseDir: __dirname,
  port: process.env.PORT || 7001, // Vercel 会提供一个环境变量 PORT
});
