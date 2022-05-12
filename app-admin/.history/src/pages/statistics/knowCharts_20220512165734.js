import React, { useEffect } from 'react';
import { Chart, Interval, Tooltip } from 'bizcharts';
import './index.less'
import { getExamList } from '../../services/exam'
import { IsEmpty } from '@/utils/dict';
import { getQuestion } from '../../services/question'
const KnowCharts = (props) => {


    let { scoreData = [], user } = props


    useEffect(async () => {


        let { data } = await getExamList({ user_id: user._id })
        let examList = data.filter(item => !IsEmpty(item.knowList))

        examList.map(async (item) => {
            let questionList = (await getQuestion(item.paper_id))?.data
            console.log('questionList: ', questionList);

        })

        console.log('user: ', examList);
    }, [user])


    const scale = {
        people: { min: 0 },
        sales: {
            min: 0, // 定义数值范围的最小值
            max: 100, // 定义数值范围的最大值
            formatter: d => `${d}%`,
            alias: "完成度",
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