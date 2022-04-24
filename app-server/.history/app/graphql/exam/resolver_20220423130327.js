module.exports = {
    Query: {
        examList(root, { filters }, ctx) {
            return ctx.connector.exam.getExams(filters);
        },
    },
    Mutation: {
        addExam(root, { exam }, ctx) {
            return ctx.connector.exam.addExam(exam);
        },
        delExam(root, { ids }, ctx) {
            return ctx.connector.exam.delExam(ids);
        },
        updateExam(root, { id, exam }, ctx) {
            return ctx.connector.exam.updateExam(id, exam);
        },
        addScore(root, { id, sign }, ctx) {
            return ctx.connector.exam.addScore(id, sign);
        },
    }
}