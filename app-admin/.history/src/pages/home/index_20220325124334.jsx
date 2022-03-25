import React from 'react';
import { Calendar, Alert, message } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { getConfig, getUser } from '@/utils/dict';
import graphql from '@/utils/graphql';

export default class App extends React.Component {
  state = {
    value: moment(),
    signTime: '',
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
  componentDidMount() {
    const isSign = JSON.parse(sessionStorage.getItem('isSign'));
    this.setState({
      signTime: isSign,
    });
  }

  signIn = async () => {
    const isSign = JSON.parse(sessionStorage.getItem('isSign'));
    if (!!isSign) {
      message.warning('你已签到');
    }
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
        sign_in: moment().format('YYYYMMDD HHMmmss'),
        date: moment().format('YYYYMMDD HHMmmss'),
      },
    };

    try {
      const res = await graphql(query, variables);
      sessionStorage.setItem('isSign', JSON.stringify(res.signIn));
      console.log('res: ', res);
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

  signOut = async () => {
    const user = await getUser();
    const isSign = JSON.parse(sessionStorage.getItem('isSign'));
    const query = `mutation SignOut($id: ID, $sign: SignInput){
      signOut(id: $id, sign: $sign)
    }`;
    const variables = {
      id: isSign?._id ?? '',
      sign: {
        user_id: user._id,
        sign_in: isSign?.sign_in,
        sign_out: moment().format('YYYYMMDD HHMmmss'),
        date: moment().format('YYYYMMDD HHMmmss'),
      },
    };

    try {
      await graphql(query, variables);
      sessionStorage.removeItem('isSign');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { value, selectedValue } = this.state;

    return (
      <div className={styles.sign}>
        <div className={styles.left}>
          <Alert
            message={`你签到的时间是: ${
              isSign &&
              moment(this.state.isSign, 'YYYYMMDD HHmmss').format(
                'YYYY-MM-DD HH:mm:ss',
              )
            }`}
          />
          <Calendar
            value={value}
            onSelect={this.onSelect}
            onPanelChange={this.onPanelChange}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.btn} onClick={this.signIn}>
            签到
          </div>
          <div className={styles.btn} onClick={this.signOut}>
            签退
          </div>
        </div>
      </div>
    );
  }
}
