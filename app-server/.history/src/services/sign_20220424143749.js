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


export async function addSign({ sign_in, user_id, sign_out }) {
  console.log(' sign_in, user_id, sign_out: ', sign_in, user_id, sign_out);

  const query = `mutation SignIn($sign:SignInput){
      signIn(sign: $sign){
        _id
        user_id
        sign_in
        sign_out
        date
      }
    }`;
  const variables = {
    sign: {
      user_id: user_id,
      sign_in: moment(sign_in).valueOf(),
      sign_out: moment(sign_out).valueOf(),
      date: moment(moment(sign_out).valueOf()).diff(moment(Number(sign_in)), 'minute'),
    },
  };

  try {
    const res = await graphql(query, variables);
  } catch (error) {
    console.error(error);
  }
}


export async function updateSign(id, validateValue) {
  const query = `mutation SignOut($id: ID, $sign: SignInput){
      signOut(id: $id, sign: $sign)
    }`;
  const variables = {
    id: id,
    sign: {
      ...validateValue,
      sign_in: moment(validateValue.sign_in).valueOf(),
      sign_out: moment(validateValue.sign_out).valueOf(),
      date: moment(moment(validateValue?.sign_out).valueOf()).diff(moment(Number(validateValue?.sign_in)), 'minute'),
    },
  };

  try {
    await graphql(query, variables);
  } catch (error) {
    console.error(error);
  }
}
