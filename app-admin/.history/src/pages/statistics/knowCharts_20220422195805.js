import React from 'react';
import { Chart, Line, Point, Tooltip, Annotation } from 'bizcharts';
import './index.less'
// // 数据源
// const data = [
//     {
//         type: '60分钟',
//         sales: 38,
//     },
//     {
//         type: '粮油副食',
//         sales: 52,
//     },
//     {
//         type: '生鲜水果',
//         sales: 61,
//     },
//     {
//         type: '美容洗护',
//         sales: 145,
//     },
//     {
//         type: '母婴用品',
//         sales: 48,
//     },
//     {
//         type: '进口食品',
//         sales: 38,
//     },
//     {
//         type: '食品饮料',
//         sales: 38,
//     },
//     {
//         type: '家庭清洁',
//         sales: 38,
//     },
// ];

const SignChart = (props) => {


    let { scoreData = [] } = props

    const scale = {
        people: { min: 0 },
        // city: {
        //         formatter: v => {
        //                 return {
        //                         London: '伦敦',
        //                         Tokyo: '东京'
        //                 }[v]
        //         }
        // }
    }


    return (
        <div style={{ height: '600px', marginBottom: '30px' }}>
            <div className='bizcharts-plot-title'>分数统计图</div>
            <div className='bizcharts-plot-description'>学生考试分数统计图</div>
            <Chart scale={scale} padding={[40, 60, 60, 40]} autoFit height={600} data={scoreData} >
                <Point position="sum_score*people" color="paper_title" shape='circle' />
                <Line shape="smooth" position="sum_score*people" color="paper_title" label="people" />
                <Tooltip shared showCrosshairs 
                 title={(v)=>{
                    return `${v}分`
                }}
                />

              <Annotation.Text
				position={['max', 'min']}
				content="分数(单位:分)"
				offsetX={-30}
                offsetY={20}
				style={{
					textAlign: 'left',
					fontSize: 14
				}} />
              <Annotation.Text
				position={['min', 'max']}
				content="人数(单位:人)"
				offsetX={-30}
                offsetY={-30}
				style={{
					textAlign: 'left',
					fontSize: 14
				}} />
            </Chart>
        </div>
    );
}


export default SignChart