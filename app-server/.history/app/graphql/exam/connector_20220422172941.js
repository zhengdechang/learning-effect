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
            conditions.paper_id = ObjectId(filters.paper_id);
        }

        if (filters?.user_id) {
            conditions.user_id = ObjectId(filters.user_id);
        }

        // 根据 paper_id 获取 exams
        // 根据 exams 中的 user_id 获取 users
        // 根据 users 中的 classes_id 获取 classes
        // 返回渲染成一个 table，需要改谁的卷子就跳转（如果 exams 已经有 score 成绩，跳转查看批阅详情）
        // 跳转后批改试卷，将每题得分更新到 answer，并将总分更新到 exams
        // exams 有总分，学生端显示已批改，可查看每项的得分，总分
        // 
        let exams = [];
        try {
            exams = await this.ctx.model.Exam.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                    pipeline: [{
                        $lookup: {
                            from: 'classes',
                            localField: 'classes_id',
                            foreignField: '_id',
                            as: 'class',
                        }
                    }],
                },
            },
            {
                $lookup: {
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
        console.log(exams[0]?.user)
        data = exams;
        return { data, total: exams.length };
    }

    async addExam(exam) {
        return await this.ctx.service.exam.addExam(exam);
    }

    async updateExam(id, exam) {
        let res
        try {
            res = await this.ctx.model.Exam.where({ _id: ObjectId(id) }).update(exam);

        } catch (error) {
            this.ctx.throw(500, '更新失败');
        }

        return res
    }



    async delExam(ids) {
        try {
            console.log(ids, 'ids')
            res = await this.ctx.model.Exam.deleteMany({
                id: {
                    $in: ids
                }
            });

            console.log(res, res)
        } catch (error) {
            this.ctx.throw(500, '删除失败');
        }
        return ids;
    }


    async addScore(id, sign) {
        let res
        try {
            res = await this.ctx.model.Exam.where({ _id: ObjectId(id) }).updateOne(sign);
        } catch (error) {
            this.ctx.throw(500, '改卷失败');
        }
        return JSON.stringify(res);
    }


}

module.exports = Connector;