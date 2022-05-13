// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTokenHandler = require('../../../app/middleware/tokenHandler');

declare module 'egg' {
  interface IMiddleware {
    tokenHandler: typeof ExportTokenHandler;
  }
}
