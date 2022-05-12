import graphql from '@/utils/graphql';

export function getQuestion() {
  const query = `query QuestionList($filters: Filters) {
        questionList(filters: $filters){
          _id
          paper_id
          question_type
          question_content
          question_value
          question_score
        }
      }`;
  const variables = {
    filters: {
      paper_id: this.paperId,
    },
  };

  let res;
  try {
    res = await graphql(query, variables);
    console.log();
  } catch (error) {
    console.error(error);
  }

  // const questionList = _.get(res, 'questionList');
  // this.formQuestionList(questionList);
};

