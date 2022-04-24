module.exports = {
    Query: {
        infoList(root, { filters }, ctx) {
            return ctx.connector.info.getInfo(filters);
        },
    },
    Mutation: {
        addInfo(root, { info }, ctx) {
            return ctx.connector.info.addInfo(info);
        },
        delInfo(root, { ids }, ctx) {
            return ctx.connector.info.delInfo(ids);
        },
        updateInfo(root, { id, info, filters }, ctx) {
            return ctx.connector.info.updateInfo(id, info, filters);
        }
    }
}