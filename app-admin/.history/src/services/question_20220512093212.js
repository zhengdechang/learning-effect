import graphql from '@/utils/graphql';

export async function getQuestion() {
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

export function delPaper(ids) {
  const query = `mutation DelPaper($ids: [ID]) {
    delPaper(ids: $ids)
  }`;
  const variables = {
    ids,
  };

  return graphql(query, variables);
}