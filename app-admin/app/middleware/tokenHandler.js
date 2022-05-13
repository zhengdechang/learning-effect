'use strict';

module.exports = (options) => {
  return async function (ctx, next) {
    // 开启 GraphiQL IDE 调试时，所有的请求放过
    if (ctx.app.config.graphql.graphiql) {
      await next()
      return
    }

    let token = ctx.request.header['authorization'];
    if (token) {
      token = token.replace(/^Bearer\s(.+)/, "$1");
      try {
        const user = ctx.app.jwt.verify(token, options.secret);
        ctx.user = user;
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          message: error.message,
        };
        return;
      }
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {
        message: '未登录',
      };
      return;
    }
  };
};
