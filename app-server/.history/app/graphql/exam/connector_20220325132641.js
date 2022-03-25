'use strict';
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;

class Connector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    async getExams(filters) {
        let data = [], total = 0;
        const conditions = {};

        if (filters?.paper_id) {
            conditions.paper_id = filters.paper_id;
        }
        console.log(conditions, 'filters')

        // 根据 paper_id 获取 exams
        // 根据 exams 中的 user_id 获取 users
        // 根据 users 中的 classes_id 获取 classes
        // 返回渲染成一个 table，需要改谁的卷子就跳转（如果 exams 已经有 score 成绩，跳转查看批阅详情）
        // 跳转后批改试卷，将每题得分更新到 answer，并将总分更新到 exams
        // exams 有总分，学生端显示已批改，可查看每项的得分，总分
        // const exams = await this.ctx.model.Exam.find(conditions).populate("user_id").populate("classes_id");
        let exams = [];
        try {
            exams = await this.ctx.model.Exam.aggregate([{
                $group: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $group: {
                    from: 'papers',
                    localField: 'paper_id',
                    foreignField: '_id',
                    as: 'paper',
                },
            },
            {
                $match: conditions
            }])
        } catch (error) {
            this.ctx.throw("获取失败");
        }

        data = exams;
        return { data, total: exams.length };
    }

    async addExam(exam) {
        return await this.ctx.service.exam.addExam(exam);
    }

    async updateExam(id, exam) {
        try {
            this.ctx.service.exam.where({ _id: ObjectId(id) }).update(exam);
        } catch (error) {
            this.ctx.throw(500, '更新失败');
        }
    }

    async delExam(ids) {
        try {
            await this.ctx.model.Exam.deleteMany({
                id: {
                    $in: ids
                }
            });
        } catch (error) {
            this.ctx.throw(500, '删除失败');
        }
        return ids;
    }
}

module.exports = Connector;