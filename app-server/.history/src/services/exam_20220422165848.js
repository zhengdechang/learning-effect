import graphql from '@/utils/graphql'
import moment from 'moment';
import { message } from 'antd'
export async function endExam(id) {
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

export async function addExam({ paper_id, user_id, sum_score },) {
    const query = `mutation AddExam($exam: ExamInput){
            addExam(exam: $exam){
                _id
                paper_id
                user_id
                sum_score
            }
        }`;

    const variables = {
        exam: {
            paper_id: paper_id,
            user_id: user_id,
            sum_score: sum_score
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















