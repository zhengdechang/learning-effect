const Service = require('egg').Service;

class UserService extends Service {
    async getUserById(id) {
        const { ctx } = this;
        if (!id) return ctx.user;

        let user;
        try {
            user = await ctx.model.User.findOne({ _id: id });
        } catch (error) {
            ctx.throw(500, '获取用户信息失败')
        }
        return user;
    }
}

module.exports = UserService;