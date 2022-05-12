import { message } from 'antd';
import styles from './index.less';
import SignChart from './signChart';
import { useEffect, useState } from 'react';
import graphql from '@/utils/graphql';
import _ from 'lodash';
import ScoreChart from './scoreChart';
import DateChart from './dateChart';
import KnowCharts from './knowCharts';

import moment from 'moment';
import { getConfig, getUser } from '@/utils/dict';

export default function IndexPage() {
  const [signData, setSignData] = useState([]);

  const [scoreData, setScoreData] = useState([]);

  const [timeData, setTimeData] = useState([]);

  const [config, setConfig] = useState({});
  const [user, setUser] = useState({});

  const handleClick = (e) => {
    if (e.target && e.target.nodeName.toLowerCase() === 'li') {
      message.success(e.target.innerHTML);
    }
  };

  const getSign = async () => {
    const query = `query SignList( $filters: Filters, $current: Int, $pageSize: Int){
             signList(current: $current, pageSize: $pageSize, filters: $filters){
            data {
              _id
              user_id
              sign_in
              sign_out
              date
            }
            total
          }
        }`;
    const variables = {};

    try {
      let res = await graphql(query, variables);
      let { data } = res.signList;

      data = data.filter((item) => item.date);
      let data30 = data.filter((item) => Number(item.date) <= 30);

      let data60 = data.filter(
        (item) => Number(item.date) > 30 && Number(item.date) <= 60,
      );

      let data90 = data.filter(
        (item) => Number(item.date) > 60 && Number(item.date) <= 90,
      );

      let data120 = data.filter(
        (item) => Number(item.date) > 90 && Number(item.date) <= 120,
      );

      let data150 = data.filter(
        (item) => Number(item.date) > 120 && Number(item.date) <= 150,
      );

      let data180 = data.filter(
        (item) => Number(item.date) > 150 && Number(item.date) <= 180,
      );

      let data210 = data.filter((item) => Number(item.date) > 180);

      setSignData([
        {
          date: '30分钟内',
          people: data30?.length,
        },
        {
          date: '60分钟内',
          people: data60?.length,
        },
        {
          date: '90分钟内',
          people: data90?.length,
        },
        {
          date: '120分钟内',
          people: data120?.length,
        },
        {
          date: '150分钟内',
          people: data150?.length,
        },
        {
          date: '180分钟内',
          people: data180?.length,
        },
        {
          date: '超过180分钟',
          people: data210?.length,
        },
      ]);

      console.log(data30, data60, data90, data120, '124');

      // let signData = data.map(item => {
      //   if (_.isEmpty(item.date)) return

      // })

      console.log(data, 'res');
    } catch (error) {
      console.error(error);
    }
  };

  const getScore = async () => {
    const query = `
      query ExamList($filters: Filters){
        examList(filters: $filters){
          data{
            sum_score
            paper{
              paper_title
            }
            
          }
          total
        }
      }
    `;

    const variables = {
      filters: {},
    };
    const res = await graphql(query, variables);
    let { data } = res?.examList;
    data = data?.map((item, index) => {
      let { paper, ...i } = item;
      return {
        ...i,
        ...paper?.[0],
      };
    });

    let map = new Map();
    let list = [];

    data.map((item) => {
      if (map.has(item.paper_title + item.sum_score)) {
        map.get(item.paper_title + item.sum_score).people += 1;
      } else {
        map.set(item.paper_title + item.sum_score, {
          ...item,
          people: 1,
        });
      }
    });
    map.forEach((value) => {
      list = [...list, value];
    });

    console.log(data, list, '222');
    setScoreData(
      list.sort((a, b) => (a['sum_score'] > b['sum_score'] ? 1 : -1)),
    );
  };

  const getDate = async () => {
    const query = `
      query ExamList($filters: Filters){
        examList(filters: $filters){
          data{
            start_time
            end_time
            paper{
              paper_title
            }
            
          }
          total
        }
      }
    `;

    const variables = {
      filters: {},
    };
    const res = await graphql(query, variables);
    let { data } = res?.examList;
    data = data?.map((item, index) => {
      let { paper, ...i } = item;
      return {
        time: moment(Number(i.end_time)).diff(
          moment(Number(i.start_time)),
          'minute',
        ),
        ...paper?.[0],
      };
    });

    let map = new Map();
    let list = [];

    data.map((item) => {
      if (map.has(item.paper_title + item.time)) {
        map.get(item.paper_title + item.time).people += 1;
      } else {
        map.set(item.paper_title + item.time, {
          ...item,
          people: 1,
        });
      }
    });
    map.forEach((value) => {
      list = [...list, value];
    });
    list = list.filter((item) => item.time >= 0);
    console.log(data, list, '222');
    setTimeData(list.sort((a, b) => (a['time'] > b['time'] ? 1 : -1)));
  };

  useEffect(async () => {
    const user = await getUser();
    const config = await getConfig();
    console.log('config: ', config, user);

    setUser(user);
    setConfig(config);
  }, []);

  useEffect(() => {
    getSign();
    getScore();
    getDate();
  }, []);

  const Data = [];

  return (
    <div className={styles.statistics}>
      {user?.user_type === config?.user_type?.teacher && (
        <ul onClick={handleClick}>
          <SignChart signData={signData}></SignChart>
          <ScoreChart scoreData={scoreData}></ScoreChart>
          <DateChart timeData={timeData}></DateChart>
        </ul>
      )}
      {user?.user_type === config?.user_type?.student && (
        <KnowCharts Data={Data} user={user}></KnowCharts>
      )}
    </div>
  );
}
