module.exports = {
    Query: {
        paperList(root, { current, pageSize, filters }, ctx){
            return ctx.connector.paper.getPapers(filters, current, pageSize);
        },
    },
    Mutation: {
        addPaper(root, { paper }, ctx){
            return ctx.connector.paper.addPaper(paper);
        },
        delPaper(root, { ids }, ctx){
            return ctx.connector.paper.delPaper(ids);
        },
        updatePaper(root, { id, paper }, ctx){
            return ctx.connector.paper.updatePaper(id, paper);
        }
    }
}