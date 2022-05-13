import request from '@/utils/request';
import graphql from '@/utils/graphql';
import { message } from 'antd';
import { getExamList } from '@/services/exam'
import _ from 'lodash';
import { getKnowList } from '@/services/know'
import { getQuestion } from '@/services/question'

export async function getConfig() {
    let config;
    const configStr = sessionStorage.getItem('config');
    try {
        config = JSON.parse(configStr);
    } catch (error) {
        message.error('config 解析失败');
    }

    if (!config) {
        config = await request('/api/getConfig');
        sessionStorage.setItem('config', JSON.stringify(config));
    }

    return config;
}

export async function getUser() {
    let user;
    const userInfoStr = sessionStorage.getItem('user');
    try {
        user = JSON.parse(userInfoStr);
    } catch (error) {
        message.error('user 解析失败');
    }

    console.log('111')

    if (!user) {
        const query = `query {
            getUserById{
              _id
              phone
              name
              user_type
              created_at
              classes_id
              mark_id
              info_id
            }
        }`;
        const res = await graphql(query);
        user = res?.getUserById;
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    return user;
}


export const IsEmpty = (val) => {
    if (val === false) {
        return true;
    }
    if (typeof val === 'boolean') {
        return false;
    }
    if (typeof val === 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length == 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (
            val == 'null' ||
            val == null ||
            val == 'undefined' ||
            val == undefined ||
            val == ''
        )
            return true;
        return false;
    }
    return false;
};

export const getComPc = async (user) => {
    let complement = []

    let com_pc = {}

    let { data } = await getExamList({ user_id: user._id })
    let examList = data.filter(item => !IsEmpty(item.knowList))


    examList.map(async (item) => {
        let paperKnow = {}
        let questionList = (await getQuestion(item.paper_id))?.questionList?.filter(item => !IsEmpty(item.know_score))
        questionList.map(i => {
            Object.keys(JSON.parse(i.know_score)).map(key => {
                paperKnow = {
                    ...paperKnow,
                    [key]:
                        (!IsEmpty(paperKnow?.[key]) ? paperKnow?.[key] : 0) +
                        _.divide(+(JSON.parse(i.know_score)?.[key]), questionList?.length),
                };
            })

        })

        let knowList = JSON.parse(item.knowList)

        let com = {}

        Object.keys(knowList).map(key => {
            Object.keys(paperKnow).map(k => {
                if (key == k) {
                    com = {
                        ...com,
                        [key]: _.divide(+paperKnow?.[key], +knowList?.[key])
                    }
                }
            })
        })
        complement.push(com)


        complement.map(item => {
            Object.keys(item).map(key => {
                com_pc = {
                    ...com_pc,
                    [key]:
                        (!IsEmpty(com_pc?.[key]) ? com_pc?.[key] : 0) +
                        item[key],
                };
            })
        })
    })

    let datas = (await getKnowList()).data

    return com_pc

}