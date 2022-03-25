'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  graphql: {
    enable: true,
    package: 'egg-graphql',
  },
  jwt: {
    enable: true,
    package: "egg-jwt"
  }
};
