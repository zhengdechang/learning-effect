module.exports = {
    Query: {
        markList(root, { filters }, ctx) {
            return ctx.connector.mark.getMark(filters);
        },
    },
    Mutation: {
        addMark(root, { mark }, ctx) {
            return ctx.connector.mark.addMark(mark);
        },
        delMark(root, { ids }, ctx) {
            return ctx.connector.mark.delMark(ids);
        },
    }
}