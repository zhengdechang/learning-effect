import graphql from '@/utils/graphql'
import moment from 'moment';
import { message } from 'antd'


export async function addMark({ mark_name }) {
    const query = `mutation AddMark($exam: MarkInput){
            addMark(exam: $exam){
                _id
                mark_name
            }
        }`;

    const variables = {
        exam: {
            mark_name: mark_name,
        },
    };

    try {
        const res = await graphql(query, variables);
        message.success('添加成功');
    } catch (error) {
        console.error(error);
        return;
    }
}

export async function getMarkList(filters, current, pageSize) {
    const query = `
      query MarkList($filters: Filters){
        markList(filters: $filters){
          data{
            _id
        mark_name
          }
          total
        }
      }
    `;

    const variables = {
        filters
    };
    const res = await graphql(query, variables);
    let { total, data } = res?.examList;
    data = data?.map((item, index) => {
        let { user, paper, ...i } = item;
        return {
            key: index,
            ...i,
            ...user?.[0],
            ...paper?.[0],
            ...user?.[0]?.class[0],
        };
    });
    console.log('data', data)
    return {
        total,
        data,
        status: 'success',
    };
}















