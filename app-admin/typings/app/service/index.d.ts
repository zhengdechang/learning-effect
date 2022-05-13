// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAnswer = require('../../../app/service/answer');
import ExportExam = require('../../../app/service/exam');
import ExportPaper = require('../../../app/service/paper');
import ExportQuestion = require('../../../app/service/question');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    answer: AutoInstanceType<typeof ExportAnswer>;
    exam: AutoInstanceType<typeof ExportExam>;
    paper: AutoInstanceType<typeof ExportPaper>;
    question: AutoInstanceType<typeof ExportQuestion>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
