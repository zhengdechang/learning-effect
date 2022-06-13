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
    isSignIn: sessionStorage.getItem('isSign'),
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

  signIn = async () => {
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
        // sign_out: momnet().format('YYYYMMDD HHMmmss'),
        date: moment().format('YYYYMMDD HHMmmss'),
      },
    };

    try {
      const res = await graphql(query, variables);
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

    // const variables = {
    //   sign: {
    //     user_id: user._id,
    //     sign_in: moment().format('YYYYMMDD HHMmmss'),
    //     // sign_out: momnet().format('YYYYMMDD HHMmmss'),
    //     date: moment().format('YYYYMMDD HHMmmss'),
    //   },
    // };

    const query = `mutation UpdateUser($id: ID, $user: UserInput){
      updateUser(id: $id, user: $user)
    }`;
    const variables = {
      id: this.isSignIn._id ?? '',
      sign: {
        user_id: user._id,
        sign_out: momnet().format('YYYYMMDD HHMmmss'),
        date: moment().format('YYYYMMDD HHMmmss'),
      },
    };

    try {
      await graphql(query, variables);
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
            message={`您选择的日期是: ${
              selectedValue && selectedValue.format('YYYY-MM-DD')
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