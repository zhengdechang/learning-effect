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
          com_pc
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

  }

  return res

}


export async function updateUser(user_id, user) {

  const updateQuery = `mutation UpdateUser($id: ID, $user: UserInput){
      updateUser(id: $id, user: $user)
    }`;
  const updateVariables = {
    id: user_id,
    user: {
      ...user
    },
  };

  try {
    await graphql(updateQuery, updateVariables,);
    return true;
  } catch (error) {

  }

}



