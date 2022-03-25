import request from '@/utils/request';

export default async function graphql(query = '', variables = {}){
    const res = await request('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables,
        })
    });

    return res?.data;
}