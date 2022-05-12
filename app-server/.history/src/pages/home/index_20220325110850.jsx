import React from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { getConfig, getUser } from '@/utils/dict';
import graphql from '@/utils/graphql';

export default class App extends React.Component {
  state = {
    value: moment(),
    selectedValue: moment(),
  };

  onSelect = (value) => {
    this.setState({
      value,
      selectedValue: value,
    });
  };

  onPanelChange = (value) => {
    this.setState({ value });
  };

  sign = async () => {
    const user = await getUser();
    const query = `mutation SignIn($sign:SignInput){
      signIn(sign: $sign){
        _id
        user_id
        sign_in
        sign_out
        date
      }
    }`;
    const variables = {
      sign: {
        user_id: user._id,
        sign_in: momnet().format('YYYYMMDD HHMmmss'),
        sign_out: momnet().format('YYYYMMDD HHMmmss'),
        date: momnet().format('YYYYMMDD HHMmmss'),
      },
    };

    try {
      await graphql(query, variables);
    } catch (error) {
      console.error(error);
    }
    //         const user = await getUser();

    //        const query = `query SignList( $filters: Filters, $current: Int, $pageSize: Int){
    //          signList(current: $current, pageSize: $pageSize, filters: $filters){
    //         data {
    //           _id
    //           user_id
    //           sign_in
    //           sign_out
    //           date
    //         }
    //         total
    //       }
    //     }`;
    //     const variables = {
    //     };

    //     try {
    //       await graphql(query, variables);
    //
    //     } catch (error) {
    //       console.error(error);
    //     }
    //
  };

  render() {
    const { value, selectedValue } = this.state;
    return (
      <div className={styles.sign}>
               {' '}
        <div className={styles.left}>
                   {' '}
          <Alert
            message={`您选择的日期是: ${
              selectedValue && selectedValue.format('YYYY-MM-DD')
            }`}
          />
                   {' '}
          <Calendar
            value={value}
            onSelect={this.onSelect}
            onPanelChange={this.onPanelChange}
          />
                 {' '}
        </div>
               {' '}
        <div className={styles.right}>
                   {' '}
          <div className={styles.btn} onClick={this.sign}>
            签到
          </div>
                    <div className={styles.btn}>签退</div>       {' '}
        </div>
             {' '}
      </div>
    );
  }
}
