module.exports = {
    Query: {
        signList(root, { current, pageSize, filters }, ctx) {
            return ctx.connector.sign.getSign(current, pageSize, filters);
        },
    },
    Mutation: {
        signIn(root, { sign }, ctx) {
            return ctx.connector.sign.signIn(sign);
        },
        signOut(root, { id, sign }, ctx) {
            return ctx.connector.sign.signOut(id, sign);
        },
        delSign(root, { ids }, ctx) {
            return ctx.connector.sign.delSign(ids);
        },
    }
}