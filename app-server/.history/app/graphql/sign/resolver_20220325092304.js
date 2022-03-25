module.exports = {
    Query: {
        signList(root, { filters }, ctx) {
            return ctx.connector.sign.getSign(filters);
        },
    },
    Mutation: {
        signIn(root, { sign }, ctx) {
            return ctx.connector.sign.signIn(sign);
        },
        signOut(root, { sign }, ctx) {
            return ctx.connector.sign.signOut(sign);
        },
    }
}