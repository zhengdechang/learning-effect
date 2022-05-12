import graphql from '@/utils/graphql'
import moment from 'moment';

export async function endExam(id){
    const query = `mutation UpdateExam($id: ID, $exam: ExamInput){
        updateExam(id: $id, exam: $exam)
    }`;

    const variables = {
        id,
        exam: {
            end_time: moment().valueOf(),
        }
    };

    try {
        await graphql(query, variables);
    } catch (error) {
        console.error(error);
    }
}














