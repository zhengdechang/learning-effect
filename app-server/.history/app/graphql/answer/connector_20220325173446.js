'use strict';
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;

class Connector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    async getAnswer(filters) {
        const conditions = {};

        if (filters?.paper_id) {
            conditions.paper_id = ObjectId(filters.paper_id);
        }

        if (filters?.user_id) {
            conditions.user_id = ObjectId(filters.user_id);
        }

        console.log(conditions)

        const data = await this.ctx.model.Answer.find(conditions).populate('question_id');



        return data;
    }

    async addAnswers(answers) {
        return await this.ctx.service.answer.addAnswers(answers);
    }

    async delAnswer(ids) {
        try {
            await this.ctx.model.Answer.deleteMany({
                id: {
                    $in: ids
                }
            });
        } catch (error) {
            this.ctx.throw(500, '删除回答失败');
        }
        return ids;
    }
}

module.exports = Connector;