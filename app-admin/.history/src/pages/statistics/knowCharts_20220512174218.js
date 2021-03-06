import React, { useEffect } from 'react';
import { Chart, Interval, Tooltip } from 'bizcharts';
import './index.less'
import { getExamList } from '../../services/exam'
import { IsEmpty } from '@/utils/dict';
import { getQuestion } from '../../services/question'
const KnowCharts = (props) => {


    let { scoreData = [], user } = props


    useEffect(async () => {

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

            console.log('questionList: ', com, complement);
        })

        console.log('user: ', examList);
    }, [user])


    const scale = {
        people: { min: 0 },
        sales: {
            min: 0, // ??????????????????????????????
            max: 100, // ??????????????????????????????
            formatter: d => `${d}%`,
            alias: "?????????",
        }
    }


    const data = [
        { know: '?????????', sales: 38 },
        { know: '??????', sales: 52 },
        { know: 'c??????', sales: 61 },
        { know: 'bbb', sales: 45 },
    ];



    return (
        <div style={{ height: '600px', marginBottom: '30px' }}>
            <div className='bizcharts-plot-title'>??????????????????</div>
            <div className='bizcharts-plot-description'>?????????????????????????????????</div>
            <Chart
                height={500}
                autoFit
                size={10}
                scale={scale}
                data={data}
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