import graphql from '@/utils/graphql';


export async function getUserList(filters, current, pageSize) {
    const query = `query UserList( $filters: Filters, $current: Int, $pageSize: Int){
      userList(current: $current, pageSize: $pageSize, filters: $filters){
        data {
          _id
          phone
          name
          user_type
          created_at
          classes_id
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
