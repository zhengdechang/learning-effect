'use strict';
const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

class AnswerService extends Service {
    async addAnswers(answers) {
        const { ctx } = this;
        answers = _.map(answers, answer => {
            return {
                ...answer,
                question_id: ObjectId(answer?.question_id),
                paper_id: ObjectId(answer?.paper_id),
                user_id: ObjectId(answer?.user_id),
                exam_id: ObjectId(answer?.exam_id),
            };
        });
        console.log(answers);

        try {
            return await ctx.model.Answer.insertMany(answers);
        } catch (error) {
            this.ctx.throw(500, '添加回答失败');
        }
    }
}

module.exports = AnswerService;