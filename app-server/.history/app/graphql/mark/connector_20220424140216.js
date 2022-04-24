'use strict';
const _ = require('lodash');

class Connector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    async getMark(filters) {
        let data = [], total = 0;
        const conditions = {};

        try {
            data = await this.ctx.model.Mark.find(conditions);
            total = data.length;
        } catch (error) {
            this.ctx.throw(500, '获取标签信息失败');
        }

        return { data, total };
    }

    async addMark(mark) {
        let res;
        try {
            const model = new this.ctx.model.Mark(mark);
            res = await model.save();
        } catch (error) {
            this.ctx.throw(500, '添加标签失败');
        }

        return res;
    }

    async delMark(ids) {
        try {
            let res = await this.ctx.model.Mark.deleteMany({
                _id: {
                    $in: ids
                }
            });
            console.log(res, "res")
        } catch (error) {
            this.ctx.throw(500, '删除班级失败');
        }
    }

    async updateMark(id, mark, filters) {
        console.log('id, mark, filters: ', id, mark, filters);
        try {
            let res = await this.ctx.model.Mark.where({ _id: ObjectId(id), ...filters }).updateOne(mark);
            return res
        } catch (error) {
            this.ctx.throw(500, '修改用户信息失败');
        }
    }

}

module.exports = Connector;