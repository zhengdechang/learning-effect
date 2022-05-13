'use strict';
const Service = require('egg').Service;
const config = require('../assets/config.json');
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

class PaperService extends Service{
    async addPaper(paper){
        const { ctx } = this;
        paper.user_id = ctx.user?._id;
        let res;
        try {
            const model = new this.ctx.model.Paper(paper);
            res = await model.save();
        } catch (error) {
            this.ctx.throw(500, '新建失败');
        }

        return res;
    }

    // 获取试卷列表
    async getPapers(filters, current, pageSize){
        const { ctx } = this;
        let data = [], total = 0;

        let aggregation = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'users',
                }
            },
            {
                $unwind:{
                    path:"$users",
                    preserveNullAndEmptyArrays:true
                }
            },
            {
                $project: {
                    _id: 1,
                    paper_title: 1,
                    paper_type: 1,
                    paper_status: 1,
                    paper_points: 1,
                    paper_score: 1,
                    paper_for_classes: 1,
                    paper_time: 1,
                    created_at: 1,
                    pass_at: 1,
                    user_id: 1,
                    name: "$users.name",
                }
            },
        ], match = {};

        if(filters?.name){
            match.name = {
                $regex: new RegExp(filters.name, 'i'),
            }
        }

        if(filters?.paper_title){
            match.paper_title = {
                $regex: new RegExp(filters.paper_title, 'i'),
            }
        }

        if(filters?.startTime && filters?.endTime){
            match.pass_at = {
                $gt: filters.startTime,
                $lt: filters.endTime,
            }
        }

        if(filters?._id){
            match._id = ObjectId(filters._id);
        }

        const user = ctx.user;
        if(user?.user_type === config?.user_type?.teacher){
            // 只能看对应自己 id 的
            match.user_id = ObjectId(user?._id)
        }
        else if(user?.user_type === config?.user_type?.student){
            // 查询对应班级
            // user?.classes_id
            match.paper_status = config?.paper_status?.pass;
        }

        try {
            const papers  = await ctx.model.Paper.aggregate([ ...aggregation, { $match: match } ]);
            total = papers.length;
            data = papers;
            // data = _.slice(papers, (current - 1)*pageSize, current*pageSize);
        } catch (error) {
            ctx.throw(500, '查询失败');
        }

        // if(user?.user_type === config?.user_type?.student){
        //     data = _.map(data, async paper => {
        //         const exam = await ctx.model.Exam.findOne({ user_id: ObjectId(user?._id), paper_id: ObjectId(paper?._id) });
        //         return { ...paper, exam: !_.isEmpty(exam) }
        //     });
        // }

        return { data, total };
    }
}

module.exports = PaperService;