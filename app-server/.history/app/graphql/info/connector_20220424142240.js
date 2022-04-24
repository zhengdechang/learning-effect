'use strict';
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;
class Connector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    async getInfo(filters) {
        let data = [], total = 0;
        const conditions = {};

        try {
            data = await this.ctx.model.Info.find(conditions);
            total = data.length;
        } catch (error) {
            this.ctx.throw(500, '获取通知信息失败');
        }

        return { data, total };
    }

    async addInfo(info) {
        let res;
        try {
            const model = new this.ctx.model.Info(info);
            res = await model.save();
        } catch (error) {
            this.ctx.throw(500, '添加通知失败');
        }

        return res;
    }

    async delInfo(ids) {
        try {
            let res = await this.ctx.model.Info.deleteMany({
                _id: {
                    $in: ids
                }
            });
            console.log(res, "res")
        } catch (error) {
            this.ctx.throw(500, '删除班级失败');
        }
    }

    async updateMark(id, info, filters) {
        try {
            let res = await this.ctx.model.Info.where({ _id: ObjectId(id), ...filters }).updateOne({ ...info });
            return res
        } catch (error) {
            this.ctx.throw(500, '修改标签信息失败');
        }
    }


}

module.exports = Connector;