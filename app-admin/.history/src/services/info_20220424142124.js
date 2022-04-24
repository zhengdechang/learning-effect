import graphql from '@/utils/graphql'
import moment from 'moment';
import { message } from 'antd'


export async function addInfo({ info_name }) {
    const query = `mutation AddInfo($info: InfoInput){
            addInfo(info: $info){
                _id
                info_name
            }
        }`;

    const variables = {
        info: {
            "info_name": info_name,
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

export async function getInfoList(filters, current, pageSize) {
    const query = `
      query InfoList($filters: Filters){
        infoList(filters: $filters){
          data{
            _id
            info_name
          }
          total
        }
      }
    `;

    const variables = {
        filters
    };
    const res = await graphql(query, variables);
    let { total, data } = res?.infoList;
    return {
        total,
        data,
        status: 'success',
    };
}

export async function updateMark(id, validateValue) {
    const query = `mutation UpdateInfo($id: ID, $info: InfoInput){
      updateInfo(id: $id, info: $info)
    }`;
    const variables = {
        id: id,
        info: {
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














