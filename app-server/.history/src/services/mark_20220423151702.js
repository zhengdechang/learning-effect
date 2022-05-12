import graphql from '@/utils/graphql'
import moment from 'moment';
import { message } from 'antd'


export async function addMark({ mark_name }) {
    const query = `mutation AddMark($mark: MarkInput){
            addMark(mark: $mark){
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
    let { total, data } = res?.markList;
    return {
        total,
        data,
        status: 'success',
    };
}















