'use strict';
const _ = require('lodash');

class Connector {
    constructor(ctx){
        this.ctx = ctx;
    }

    async getSign(filters){
        let data = [], total = 0;
        const conditions = {};

        if(filters?.user_id) {
            conditions.user_id = filters.user_id;
        }

        try {
            total = await this.ctx.model.Sign.find(conditions).count();
            data = await this.ctx.model.Sign.find(conditions).skip((current - 1)*pageSize).limit(pageSize);
        } catch (error) {
            this.ctx.throw(500, '获取考勤信息失败');
        }

        return { data, total };
    }

    async signIn(sign){
        let res;
        try {
            const model = new this.ctx.model.Sign(sign);
            res = await model.save();
        } catch (error) {
            this.ctx.throw(500, '签到失败');
        }

        return res;
    }

    async signOut(sign){
        let res;
        try {
            const model = new this.ctx.model.Sign(sign);
            res = await model.save();
        } catch (error) {
            this.ctx.throw(500, '签退失败');
        }

        return res;
    }

}

module.exports = Connector;