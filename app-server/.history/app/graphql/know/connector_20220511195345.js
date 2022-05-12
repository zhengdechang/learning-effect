'use strict';
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;
class Connector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    async getKonw(filters) {
        let data = [], total = 0;
        const conditions = {};

        try {
            data = await this.ctx.model.Know.find(conditions);
            total = data.length;
        } catch (error) {
            this.ctx.throw(500, '获取标签信息失败');
        }

        return { data, total };
    }

    async addKnow(know) {
        let res;
        try {
            console.log('Know: ', know);
            const model = new this.ctx.model.Know(know);

            res = await model.save();
        } catch (error) {
            this.ctx.throw(500, '添加标签失败');
        }

        return res;
    }

    async delKonw(ids) {
        try {
            let res = await this.ctx.model.Konw.deleteMany({
                _id: {
                    $in: ids
                }
            });
            console.log(res, "res")
        } catch (error) {
            this.ctx.throw(500, '删除班级失败');
        }
    }

    async updateKnow(id, know, filters) {
        try {
            let res = await this.ctx.model.Know.where({ _id: ObjectId(id), ...filters }).updateOne({ ...know });
            return res
        } catch (error) {
            this.ctx.throw(500, '修改标签信息失败');
        }
    }

}

module.exports = Connector;