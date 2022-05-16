'use strict';
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;


class Connector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    async getClasses(filters) {
        let data = [], total = 0;
        const conditions = {};

        try {
            data = await this.ctx.model.Classes.find(conditions);
            total = data.length;
        } catch (error) {
            this.ctx.throw(500, '获取班级信息失败');
        }

        return { data, total };
    }

    async addClasses(classes) {
        let res;
        try {
            const model = new this.ctx.model.Classes(classes);
            res = await model.save();
        } catch (error) {
            this.ctx.throw(500, '添加班级失败');
        }

        return res;
    }

    async delClasses(ids) {
        try {
            let res = await this.ctx.model.Classes.deleteMany({
                _id: {
                    $in: ids
                }
            });
            console.log(res, "res")
        } catch (error) {
            this.ctx.throw(500, '删除班级失败');
        }
    }

    async updateClasses(id, classes, filters) {
        try {
            let res = await this.ctx.model.Classes.where({ _id: ObjectId(id), ...filters }).updateOne({ ...classes });
            return res
        } catch (error) {
            this.ctx.throw(500, '修改标签信息失败');
        }
    }

}

module.exports = Connector;