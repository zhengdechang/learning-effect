module.exports = {
    Query: {
        classesList(root, { filters }, ctx) {
            return ctx.connector.classes.getClasses(filters);
        },
    },
    Mutation: {
        addClasses(root, { classes }, ctx) {
            return ctx.connector.classes.addClasses(classes);
        },
        delClasses(root, { ids }, ctx) {
            return ctx.connector.classes.delClasses(ids);
        },
        updateClasses(root, { id, classes, filters }, ctx) {
            return ctx.connector.mark.updateClasses(id, classes, filters);
        }
    }
}