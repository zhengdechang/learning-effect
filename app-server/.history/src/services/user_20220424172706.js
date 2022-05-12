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
          mark_id
          info_id
        }
        total
      }
    }`;



  const variables = {
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


export async function updateUser(user_id, current, pageSize) {

  const updateQuery = `mutation UpdateUser($id: ID, $user: UserInput){
      updateUser(id: $id, user: $user)
    }`;
  const updateVariables = {
    id: user_id,
    user: {
      mark_id: mark_id,
    },
  };

  try {
    await graphql(updateQuery, updateVariables,);
    return true;
  } catch (error) {
    console.error(error);
  }

}



