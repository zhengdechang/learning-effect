'use strict';
const ObjectId = require('mongodb').ObjectId;

class Connector {
    constructor(ctx){
        this.ctx = ctx;
    }

    // 获取试卷列表
    async getPapers(filters, current, pageSize){
        return await this.ctx.service.paper.getPapers(filters, current, pageSize);
    }

    async addPaper(paper){
        return await this.ctx.service.paper.addPaper(paper);
    }

    async delPaper(ids){
        try {
            await this.ctx.model.Paper.deleteMany({
                _id: {
                    $in: ids
                }
            });
        } catch (error) {
            this.ctx.throw(500, '删除失败');
        }
    }

    async updatePaper(id, paper){
        try {
            await this.ctx.model.Paper.where({ _id: ObjectId(id) }).update(paper);
        } catch (error) {
            this.ctx.throw(500, '更新失败');
        }
    }
}

module.exports = Connector;