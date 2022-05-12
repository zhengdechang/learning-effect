import graphql from '@/utils/graphql';

export async function getPapers(filters, current, pageSize) {
  const query = `query PaperList( $filters: Filters, $current: Int, $pageSize: Int){
        paperList(current: $current, pageSize: $pageSize, filters: $filters){
          total
          data {
            _id
            user_id
            paper_title
            paper_type
            paper_status
            paper_for_classes
            paper_time
            paper_points
            created_at
            pass_at
            paper_score
            name
            exam
          }
        }
      }`;

  const variables = {
    current,
    pageSize,
    filters,
  };

  let res;
  try {
    res = await graphql(query, variables);
  } catch (error) {
    console.error(error);
  }

  return {
    total: res?.paperList?.total,
    data: res?.paperList?.data,
  }
}

export function delPaper(ids) {
  const query = `mutation DelPaper($ids: [ID]) {
    delPaper(ids: $ids)
  }`;
  const variables = {
    ids,
  };

  return graphql(query, variables);
}