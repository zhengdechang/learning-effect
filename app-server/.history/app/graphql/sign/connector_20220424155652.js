
const _ = require('lodash');
const { jsonp } = require('../../../config/plugin');
const ObjectId = require('mongodb').ObjectId;
class Connector {
    constructor(ctx) {
        this.ctx = ctx;
    }


    async getSign(current, pageSize, filters) {
        let data = [], total = 0;
        const conditions = {};



        if (filters?.user_id) {
            conditions.user_id = ObjectId(filters.user_id);
        }


        let sign = [];
        try {
            sign = await this.ctx.model.Sign.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $match: conditions
            }])
        } catch (error) {
            this.ctx.throw("获取失败");
        }
        data = sign;
        return { data, total: sign.length };
    }


    // async getSign(current, pageSize, filters) {
    //     let data = [], total = 0;
    //     const conditions = {};

    //     if (filters?.user_id) {
    //         conditions.user_id = filters.user_id;
    //     }

    //     try {
    //         total = await this.ctx.model.Sign.find(conditions).count();
    //         data = await this.ctx.model.Sign.find(conditions).skip((current - 1) * pageSize).limit(pageSize);
    //     } catch (error) {
    //         this.ctx.throw(500, '获取考勤信息失败');
    //     }

    //     return { data, total };
    // }

    async signIn(sign) {
        let res;
        try {
            const model = new this.ctx.model.Sign(sign);
            res = await model.save();
        } catch (error) {
            this.ctx.throw(500, '签到失败');
        }

        return res;
    }

    async signOut(id, sign) {

        try {
            await this.ctx.model.Sign.where({ _id: ObjectId(id) }).updateOne(sign);
        } catch (error) {
            this.ctx.throw(500, '签退失败');
        }

        return JSON.stringify(sign);
    }

    async delSign(ids) {
        try {
            console.log(ids, 'ids')
            let res = await this.ctx.model.Sign.deleteMany({
                _id: {
                    $in: ids
                }
            });

            console.log(res, res)
        } catch (error) {
            this.ctx.throw(500, '删除失败');
        }
        return ids;
    }

}

module.exports = Connector;