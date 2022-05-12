import graphql from '@/utils/graphql';

export function getQuestion(paperId) {
  const query = `query QuestionList($filters: Filters) {
        questionList(filters: $filters){
          _id
          paper_id
          question_type
          question_content
          question_value
          question_score
          know
          know_score
        }
      }`;
  const variables = {
    filters: {
      paper_id: paperId,
    },
  };

  let res;
  try {
    res = await graphql(query, variables);
    console.log();
  } catch (error) {
    console.error(error);
  }

  return res
};

