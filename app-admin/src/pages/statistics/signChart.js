import React from 'react';
import ReactDOM from 'react-dom';
import { ColumnChart } from 'bizcharts';

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


    let { signData = [] } = props

    return (
        <div style={{ height: '600px', marginBottom: '30px',padding:'0px 60px 0px 0px' }}>
            <ColumnChart
                data={signData}
                title={{
                    visible: true,
                    text: '签到统计图',
                }}
                description={
                    {
                        text:'签到时长统计表'
                    }
                }
                columnSize ={50}
                autoFit
                padding='auto'
                xField='date'
                yField='people'
                tooltip={
                    {
                        visible: true,
                        formatter: (value) => {
                            // console.log(name, value)
                            return {
                                name: '时长',
                                value: `${value?.people}人`
                            }
                        }
                    }
                }
                meta={{
                    sales: {
                        alias: '时长',
                    },
                }}
            />
        </div>

    );
}


export default SignChart