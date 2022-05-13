import graphql from '@/utils/graphql';
import { message } from 'antd';

export async function getClasses(filters, current, pageSize) {
    const query = `query ClassesList($current: Int, $pageSize: Int, $filters: Filters){
        classesList(current: $current, pageSize: $pageSize, filters: $filters){
            data {
                _id
                classes_name
                com_pc
            }
            total
        }
    }`;

    const variables = {
        current,
        pageSize,
        filters: {
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

export async function updateClasses(id, validateValue) {

    const query = `mutation UpdateClasses($id: ID, $classes: ClassesInput){
      updateClasses(id: $id, classes: $classes)
    }`;
    const variables = {
        // id: this.props.initialValues?._id,
        id: id,
        classes: {
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





