'use strict';
const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

class ExamService extends Service {
    async addExam(exam) {
        let res;
        const { ctx } = this;
        try {
            const oldExam = await ctx.model.Exam.findOne({ user_id: ObjectId(exam?.user_id), paper_id: ObjectId(exam?.paper_id) });
            // if (oldExam) {
            //     ctx.throw(403, '已经参加过考试了');
            // }
            const model = new ctx.model.Exam(exam);
            res = await model.save();
        } catch (error) {
            ctx.throw(500, '不能参加考试');
        }

        return res;
    }
}

module.exports = ExamService;