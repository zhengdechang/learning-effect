'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/getConfig', controller.home.getConfig);
  router.get('/getPublicKey', controller.user.getPublicKey);
  router.post('/login', controller.user.login);
};
