import React, { useEffect, useState } from 'react';
import { Chart, Interval, Tooltip } from 'bizcharts';
import './index.less'
import { getExamList } from '../../services/exam'
import { IsEmpty, getComPc } from '@/utils/dict';
import { getQuestion } from '../../services/question'

import { getKnowList } from '../../services/know'
import { updateUser } from '@/services/user';

import _ from 'lodash'

const KnowCharts = (props) => {


    // const getComPc = async (user) => {
    //     let complement = []

    //     let com_pc = {}

    //     let { data } = await getExamList({ user_id: user._id })
    //     let examList = data.filter(item => !IsEmpty(item.knowList))


    //     examList.map(async (item) => {
    //         let paperKnow = {}
    //         let questionList = (await getQuestion(item.paper_id))?.questionList?.filter(item => !IsEmpty(item.know_score))
    //         questionList.map(i => {
    //             Object.keys(JSON.parse(i.know_score)).map(key => {
    //                 paperKnow = {
    //                     ...paperKnow,
    //                     [key]:
    //                         (!IsEmpty(paperKnow?.[key]) ? paperKnow?.[key] : 0) +
    //                         _.divide(+(JSON.parse(i.know_score)?.[key]), questionList?.length),
    //                 };
    //             })

    //         })

    //         let knowList = JSON.parse(item.knowList)

    //         let com = {}

    //         Object.keys(knowList).map(key => {
    //             Object.keys(paperKnow).map(k => {
    //                 if (key == k) {
    //                     com = {
    //                         ...com,
    //                         [key]: _.divide(+paperKnow?.[key], +knowList?.[key])
    //                     }
    //                 }
    //             })
    //         })
    //         complement.push(com)


    //         complement.map(item => {
    //             Object.keys(item).map(key => {
    //                 com_pc = {
    //                     ...com_pc,
    //                     [key]:
    //                         (!IsEmpty(com_pc?.[key]) ? com_pc?.[key] : 0) +
    //                         item[key],
    //                 };
    //             })
    //         })
    //     })

    //     let datas = (await getKnowList()).data

    //     return com_pc

    // }


    let { scoreData = [], user } = props
    const [Data, setData] = useState([]);

    useEffect(async () => {
        if (IsEmpty(user)) return
        let com_pc = await getComPc(user)


        let Data = []

        let { data } = await getKnowList()


        Data = data.map(item => {
            let sales = !IsEmpty(com_pc?.[item?._id]) ? +com_pc?.[item?._id] * 100 : 0
            return {
                know: item.know_name,
                sales: sales.toFixed(2),
            }
        })


        updateUser(user._id, {
            com_pc: JSON.stringify(com_pc)
        });


        setData(Data)


    }, [user])


    const scale = {
        sales: {
            min: 0, // 定义数值范围的最小值
            max: 100, // 定义数值范围的最大值
            type: 'linear',
            formatter: d => `${d}%`,
            alias: "完成度",
            tickCount: 4,
            // tickCount: [0, 20, 40, 60, 80, 100],
        }
    }


    const data = [
        { know: '计算机', sales: 38 },
        { know: '测试', sales: 52 },
        { know: 'c语言', sales: 61 },
        { know: 'bbb', sales: 45 },
    ];



    return (
        <div style={{ height: '600px', marginBottom: '30px' }}>
            <div className='bizcharts-plot-title'>知识点统计图</div>
            <div className='bizcharts-plot-description'>学生知识点完成度统计图</div>
            <Chart
                height={500}
                autoFit
                size={10}
                scale={scale}
                data={Data}
                interactions={['active-region']}
                padding={[30, 30, 30, 50]}
                theme={{ maxColumnWidth: 60 }}
            >
                <Interval position="know*sales" />
                <Tooltip shared />
            </Chart>
        </div>
    );
}


export default KnowCharts