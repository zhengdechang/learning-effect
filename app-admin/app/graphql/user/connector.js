'use strict';
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;

class Connector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    async getUsers(current, pageSize, filters) {
        let data = [], total = 0;
        const conditions = {};

        if (filters?.user_type) {
            conditions.user_type = filters.user_type;
        }

        if (filters?.name) {
            conditions.name = {
                $regex: new RegExp(filters.name, 'i'),
            }
        }

        if (filters?.phone) {
            conditions.phone = {
                $regex: new RegExp(filters.phone, 'i'),
            }
        }

        if (filters?.startTime && filters?.endTime) {
            conditions.created_at = {
                $gt: filters.startTime,
                $lt: filters.endTime,
            }
        }

        if (filters?.classes_id) {
            conditions.classes_id = ObjectId(filters.classes_id);
        }

        if (filters?.mark_id) {
            conditions.mark_id = ObjectId(filters.mark_id);
        }
        if (filters?.info_id) {
            conditions.info_id = ObjectId(filters.info_id);
        }
        try {
            total = await this.ctx.model.User.find(conditions).count();
            data = await this.ctx.model.User.find(conditions).skip((current - 1) * pageSize).limit(pageSize);
        } catch (error) {
            this.ctx.throw(500, '获取用户列表失败');
        }

        return { data, total };
    }

    async getUserById() {
        return await this.ctx.service.user.getUserById();
    }

    async addUser(user) {
        let res;
        user.pwd = user.phone.substring(5);
        user.uname = user.phone;
        console.log(user);
        try {
            const model = new this.ctx.model.User(user);
            res = await model.save();
        } catch (error) {
            this.ctx.throw(500, '新建用户失败');
        }

        return res;
    }

    async delUser(ids) {
        try {
            await this.ctx.model.User.deleteMany({
                _id: { $in: ids },
            });
        } catch (error) {
            this.ctx.throw(500, '删除用户失败');
        }

        return ids;
    }

    async updateUser(id, user, filters) {
        try {
            await this.ctx.model.User.where({ _id: ObjectId(id), ...filters }).updateOne(user);
        } catch (error) {
            this.ctx.throw(500, '修改用户信息失败');
        }
    }

}

module.exports = Connector;