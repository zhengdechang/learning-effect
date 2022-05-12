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

export async function getExamList(filters, current, pageSize) {
    const query = `
      query ExamList($filters: Filters){
        examList(filters: $filters){
          data{
            _id
            paper_id
            user_id
            start_time
            end_time
            select_score
            empty_score
            brief_score
            sum_score
            user{
              name
              user_type
              phone
              created_at
              classes_id
              class{
              classes_name
               }
            }
            paper{
              paper_status
              paper_title
              paper_type
              created_at
              paper_points
              paper_time
              paper_score
              pass_at
            }
            
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


export async function updateExam(id, validateValue) {
    const query = `mutation AddScore($id: ID, $sign: UpdateScore){
      addScore(id: $id, sign: $sign)
    }`;
    const variables = {
        id: id,
        sign: {
            ...validateValue,
        },
    };

    try {
        await graphql(query, variables);
        message.success('提交完成');
    } catch (error) {
        console.error(error);
    }
}









