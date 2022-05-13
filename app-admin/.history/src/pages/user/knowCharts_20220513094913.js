import React, { useEffect, useState } from 'react';
import { Chart, Interval, Tooltip } from 'bizcharts';
import './index.less'
import { IsEmpty, getComPc } from '@/utils/dict';

import { getKnowList } from '@/services/know'
import { updateUser } from '@/services/user';

import _ from 'lodash'

const KnowCharts = (props) => {

    let { scoreData = [], user } = props
    const [Data, setData] = useState([]);

    useEffect(async () => {
        let com_pc = await getComPc(user)


        let { data } = (await getKnowList())
        let Data = data.map(item => {
            return {
                know: item.know_name,
                sales: ((+com_pc?.[item?._id]) * 100).toFixed(2),
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