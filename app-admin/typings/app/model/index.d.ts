// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAnswer = require('../../../app/model/answer');
import ExportClasses = require('../../../app/model/classes');
import ExportExam = require('../../../app/model/exam');
import ExportInfo = require('../../../app/model/info');
import ExportKnow = require('../../../app/model/know');
import ExportMark = require('../../../app/model/mark');
import ExportPaper = require('../../../app/model/paper');
import ExportQuestion = require('../../../app/model/question');
import ExportSign = require('../../../app/model/sign');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Answer: ReturnType<typeof ExportAnswer>;
    Classes: ReturnType<typeof ExportClasses>;
    Exam: ReturnType<typeof ExportExam>;
    Info: ReturnType<typeof ExportInfo>;
    Know: ReturnType<typeof ExportKnow>;
    Mark: ReturnType<typeof ExportMark>;
    Paper: ReturnType<typeof ExportPaper>;
    Question: ReturnType<typeof ExportQuestion>;
    Sign: ReturnType<typeof ExportSign>;
    User: ReturnType<typeof ExportUser>;
  }
}
