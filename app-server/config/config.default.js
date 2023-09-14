/* eslint valid-jsdoc: "off" */

"use strict";
const _ = require("lodash");
const notoken = require("../app/assets/notoken.json");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1646733339911_7537";

  // add your middleware config here
  // config.middleware = ['tokenHandler', 'graphql'];
  config.middleware = ["graphql"];

  config.tokenHandler = {
    match(ctx) {
      const url = ctx.request.url;
      if (_.includes(notoken, url)) {
        return false;
      } else {
        return true;
      }
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.jwt = {
    secret: "123456",
  };

  config.mongoose = {
    clients: {
      learningEffect: {
        url: process.env.MONGODB_URL,
        options: {},
        plugins: [],
      },
    },
  };

  config.graphql = {
    router: "/graphql",
    app: true,
    agent: false,
    graphiql: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
