import React, { useEffect, useState } from 'react';
import { Chart, Interval, Tooltip } from 'bizcharts';
// import './index.less'
import { IsEmpty, getComPc } from '@/utils/dict';

import { getKnowList } from '@/services/know'
import { getUserList } from '@/services/user';
import _ from 'lodash'

const KnowCharts = (props) => {

    let { scoreData = [], classes } = props
    const [Data, setData] = useState([]);
    const [result, setResult] = useState({});

    useEffect(async () => {

        if (IsEmpty(classes)) return



        let { userList } = await getUserList({ classes_id: classes._id });


        if (IsEmpty(userList.data)) return;

        let res = {}
        userList.data.map(async (item) => {

            let com_pc = await getComPc(item)


            Object.keys(com_pc).map(key => {
                if (!IsEmpty(res?.[key])) {
                    res = {
                        ...res,
                        [key]: _.mean([res?.[key], com_pc?.[key]])
                    }

                } else {
                    res = {
                        ...res,
                        [key]: com_pc?.[key]
                    }
                }
            })
            setResult(res)
        });

    }, [classes])


    useEffect(async () => {
        let { data } = (await getKnowList())

        let Data = data.map(item => {
            let sales = !IsEmpty(result?.[item?._id]) ? +result?.[item?._id] * 100 : 0

            return {
                know: item.know_name,
                sales: sales.toFixed(2),
            }
        })
        setData(Data)

    }, [result]);


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

    return (
        <div style={{ height: '400px', marginBottom: '30px' }}>
            <Chart
                height={400}
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