import React from 'react';
import { Chart, Interval, Tooltip } from 'bizcharts';
import './index.less'

const KnowCharts = (props) => {


    let { scoreData = [] } = props


    const scale = {
        people: { min: 0 },
        sales: {

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
            <div className='bizcharts-plot-title'>分数统计图</div>
            <div className='bizcharts-plot-description'>学生考试分数统计图</div>
            <Chart height={600} autoFit scale={scale} data={data} interactions={['active-region']} padding={[30, 30, 30, 50]} >
                <Interval position="know*sales" />
                <Tooltip shared />
            </Chart>
        </div>
    );
}


export default KnowCharts