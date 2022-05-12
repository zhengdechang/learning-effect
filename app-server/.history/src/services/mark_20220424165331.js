import graphql from '@/utils/graphql'
import moment from 'moment';
import { message } from 'antd'


export async function addMark(validateValue) {
    const query = `mutation AddMark($mark: MarkInput){
            addMark(mark: $mark){
                _id
                mark_name
            }
        }`;

    const variables = {
        mark: {
            ...validateValue
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


export async function updateMark(id, validateValue) {

    const query = `mutation UpdateMark($id: ID, $mark: MarkInput){
      updateMark(id: $id, mark: $mark)
    }`;
    const variables = {
        // id: this.props.initialValues?._id,
        id: id,
        mark: {
            ...validateValue,
        },
    };


    try {
        const res = await graphql(query, variables);
        message.success('修改成功');
    } catch (error) {
        console.error(error);
        return;
    }
}














