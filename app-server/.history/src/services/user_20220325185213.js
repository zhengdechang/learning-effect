import graphql from '@/utils/graphql';
import { message } from 'antd';

export async function getClasses(filters, current, pageSize){
    const query = `query ClassesList($current: Int, $pageSize: Int, $filters: Filters){
        classesList(current: $current, pageSize: $pageSize, filters: $filters){
            data {
                _id
                classes_name
            }
            total
        }
    }`;

    const variables = {
        current,
        pageSize,
        filters:{
            ...filters,
        },
    };

    let res;
    try {
        res = await graphql(query, variables);
    } catch (error) {
        console.error(error);
    }

    return {
        total: res?.classesList?.total,
        data: res?.classesList?.data,
    };
}






