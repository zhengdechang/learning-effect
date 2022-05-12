import graphql from '@/utils/graphql';


export async function getSignList(filters, current, pageSize) {
  const query = `query SignList( $filters: Filters, $current: Int, $pageSize: Int){
             signList(current: $current, pageSize: $pageSize, filters: $filters){
            data {
              _id
              user_id
              sign_in
              sign_out
              date
            }
            total
          }
        }`;



  const variables = {
    current,
    pageSize,
    filters
  };

  let res;
  try {
    res = await graphql(query, variables);
  } catch (error) {
    console.error(error);
  }
  console.log(res, 'res')
  return res

}
