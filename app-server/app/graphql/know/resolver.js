module.exports = {
    Query: {
        knowList(root, { filters }, ctx) {
            return ctx.connector.know.getKnow(filters);
        },
    },
    Mutation: {
        addKnow(root, { know }, ctx) {
            return ctx.connector.know.addKnow(know);
        },
        delKnow(root, { ids }, ctx) {
            return ctx.connector.know.delKnow(ids);
        },
        updateKnow(root, { id, know, filters }, ctx) {
            return ctx.connector.know.updateKnow(id, know, filters);
        }
    }
}