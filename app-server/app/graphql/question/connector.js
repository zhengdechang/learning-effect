'use strict';
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;
const xss = require('xss');

class Connector {
    constructor(ctx){
        this.ctx = ctx;
    }

    async getQuestion(filters){
        let data = [];
        const conditions = {};
        if(filters?.paper_id) {
            conditions.paper_id = ObjectId(filters.paper_id);
        }

        try {
            data = await this.ctx.model.Question.find(conditions);
        } catch (error) {
            this.ctx.throw(500, '获取题目列表失败');
        }

        return data;
    }

    async addQuestion(question){
        const { question_content: { question_title, options }, question_value } = question;
        question.question_value = xss(question_value);
        const question_content = { question_title: xss(question_title) };
        if(options){
            question_content.options = _.map(options, ({option_key, option_value}) => ({option_key: xss(option_key), option_value: xss(option_value)}));
        }
        question.question_content = question_content;

        let res;
        try {
            const model = new this.ctx.model.Question(question);
            res = await model.save();
        } catch (error) {
            this.ctx.throw(500, '添加题目失败');
        }

        return res;
    }

    async delQuestion(ids){
        try {
            await this.ctx.model.Question.deleteMany({
                _id: { $in: ids }
            });
        } catch (error) {
            this.ctx.throw(500, '删除题目失败');
        }
    }
}

module.exports = Connector;