module.exports = {
    Query: {
        answerList(root, { filters }, ctx){
            return ctx.connector.answer.getAnswer(filters);
        },
    },
    Mutation: {
        addAnswers(root, { answers }, ctx){
            return ctx.connector.answer.addAnswers(answers);
        },
        delAnswer(root, { ids }, ctx){
            return ctx.connector.answer.delAnswer(ids);
        },
      
        
    }
}