import graphql from '@/utils/graphql';
import { message } from 'antd';

export async function getUser() {
    let user;
    const userInfoStr = sessionStorage.getItem('user');
    try {
        user = JSON.parse(userInfoStr);
    } catch (error) {
        message.error('user 解析失败');
    }

    if (!user) {
        const query = `query {
            getUserById{
              _id
              phone
              name
              user_type
              created_at
              classes_id
            }
        }`;
        const res = await graphql(query);
        user = res?.getUserById;
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    return user;
}





