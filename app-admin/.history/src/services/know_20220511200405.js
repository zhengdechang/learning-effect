import graphql from '@/utils/graphql'
import moment from 'moment';
import { message } from 'antd'


export async function addKnow(validateValue) {
    console.log('validateValue: ', validateValue);
    const query = `mutation AddKnow($know: KnowInput){
            addKnow(know: $know){
                _id
                mark_name
                com_score
            }
        }`;

    const variables = {
        know: {
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

export async function getKnowList(filters, current, pageSize) {
    const query = `
      query KnowList($filters: Filters){
        markList(filters: $filters){
          data{
            _id
            mark_name
            com_score
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


export async function updateKnow(id, validateValue) {

    const query = `mutation UpdateKnow($id: ID, $know: KnowInput){
      updateKnow(id: $id, know: $know)
    }`;
    const variables = {
        // id: this.props.initialValues?._id,
        id: id,
        know: {
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














