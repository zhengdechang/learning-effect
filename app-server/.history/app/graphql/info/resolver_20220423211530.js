module.exports = {
    Query: {
        infoList(root, { filters }, ctx) {
            return ctx.connector.info.getInfo(filters);
        },
    },
    Mutation: {
        addMark(root, { mark }, ctx) {
            return ctx.connector.info.addInfo(mark);
        },
        delMark(root, { ids }, ctx) {
            return ctx.connector.info.delInfo(ids);
        },
    }
}