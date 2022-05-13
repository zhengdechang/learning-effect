module.exports = {
    Query: {
        questionList(root, { filters }, ctx){
            return ctx.connector.question.getQuestion(filters);
        },
    },
    Mutation: {
        addQuestion(root, { question }, ctx){
            let question_content;
            try {
                question_content = JSON.parse(question.question_content);
            } catch (error) {
                question_content = {};
            }
            return ctx.connector.question.addQuestion({ ...question, question_content });
        },
        delQuestion(root, { ids }, ctx){
            return ctx.connector.question.delQuestion(ids);
        },
    }
}