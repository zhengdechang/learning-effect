import graphql from '@/utils/graphql';
import moment from 'moment'

export async function getSignList(filters, current, pageSize) {
  const query = `query SignList( $filters: Filters, $current: Int, $pageSize: Int){
             signList(current: $current, pageSize: $pageSize, filters: $filters){
            data {
              _id
              user_id
              sign_in
              sign_out
              date
              user{
                name
              }
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
  return {
    total: res?.signList?.total,
    data: res?.signList?.data?.map(item => {
      return {
        ...item,
        sign_in: moment(Number(item.sign_in)).format('YYYY-MM-DD HH:mm:ss'),
        sign_out: moment(Number(item.sign_out)).format('YYYY-MM-DD HH:mm:ss'),
        name: item.user?.[0]?.name
      }
    }),
  }
}
