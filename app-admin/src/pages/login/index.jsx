import React from 'react';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { history } from 'umi';
import request from '@/utils/request';
import JSEncrypt from 'jsencrypt';
import styles from './index.less';
import graphql from '@/utils/graphql';
import _ from 'lodash';
import { addMark, getMarkList, updateMark } from '@/services/mark';
import { updateUser, getUserList } from '@/services/user';
import { IsEmpty, getComPc } from '@/utils/dict';
import { getClasses, updateClasses } from '@/services/classes';

export default class Component extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async getSignList(user_id, filters) {
    const query = `query SignList( $filters: Filters, $current: Int, $pageSize: Int){
             signList(current: $current, pageSize: $pageSize, filters: $filters){
            data {
              _id
              user_id
              date
            }
            total
          }
        }`;

    const variables = {
      filters,
    };

    let res;
    try {
      res = await graphql(query, variables);
    } catch (error) {}
    return res?.signList?.data
      ?.filter((item) => item.user_id == user_id)
      .map((item) => {
        return {
          ...item,
          date: Number(item?.date),
        };
      });
    // return {
    //   total: res?.signList?.total,
    //   data: res?.signList?.data,
    // };
  }

  async getExamList(user_id, filters) {
    const query = `
      query ExamList($filters: Filters){
        examList(filters: $filters){
          data{
            _id
            user_id
            sum_score
          }
          total
        }
      }
    `;

    const variables = {
      filters,
    };
    const res = await graphql(query, variables);
    let { total, data } = res?.examList;
    //
    return data?.filter((item) => item.user_id == user_id);
  }

  getComScore = (signAverage, scoreAverage) => {
    if (
      !signAverage ||
      !scoreAverage ||
      isNaN(signAverage) ||
      isNaN(scoreAverage)
    )
      return false;

    let signCom = 0;
    let scoreCom = 0;
    if (signAverage < 30) signCom = 1;
    if (30 <= signAverage < 60) signCom = 2;
    if (60 <= signAverage < 90) signCom = 3;
    if (90 <= signAverage < 120) signCom = 4;
    if (signAverage >= 120) signCom = 5;

    if (scoreAverage < 40) scoreCom = 1;
    if (40 <= scoreAverage < 60) scoreCom = 2;
    if (60 <= scoreAverage < 80) scoreCom = 3;
    if (80 <= scoreAverage < 90) scoreCom = 4;
    if (scoreAverage >= 90) scoreCom = 5;

    return signCom + scoreCom;
  };

  getList = async () => {
    let { userList } = await getUserList();

    userList.data.map(async (item) => {
      let com_pc = await getComPc(item);

      updateUser(item._id, {
        com_pc: JSON.stringify(com_pc),
      });
    });

    let res = await getClasses();

    res.data.map(async (item) => {
      let arr = [];

      let { userList } = await getUserList({ classes_id: item._id });

      if (IsEmpty(userList.data)) return;

      userList.data.map((item) => {
        let result = !IsEmpty(item?.com_pc) ? JSON.parse(item.com_pc) : {};
        arr = [...arr, ...Object.values(result)];
      });

      if (!IsEmpty(arr)) {
        let class_com_pc = _.mean(arr) * 100;

        await updateClasses(item._id, {
          com_pc: `${class_com_pc.toFixed(2)}%`,
        });
      }
    });
  };

  varifyUserInfo = async (values) => {
    let publicKey;
    try {
      publicKey = await request('/api/getPublicKey', {
        method: 'GET',
      });
    } catch (error) {
      return;
    }

    const jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(publicKey);
    values.pwd = jsencrypt.encrypt(values?.pwd);
    try {
      const { token, config, user, routes } = await request('/api/login', {
        method: 'POST',
        data: { ...values },
      });
      //

      localStorage.setItem('token', token);
      localStorage.setItem('routes', JSON.stringify(routes));
      sessionStorage.setItem('config', JSON.stringify(config));
      sessionStorage.setItem('user', JSON.stringify(user));

      if (user.user_type == 3 && user.mark_id) {
        let signList = await this.getSignList(user._id);
        let examList = await this.getExamList(user._id);
        let signAverage = _.meanBy(signList, function (o) {
          return o.date;
        });

        let scoreAverage = _.meanBy(examList, function (o) {
          return o.sum_score;
        });

        const markList = (await getMarkList()).data;

        let comScore = this.getComScore(signAverage, scoreAverage); //综合得分

        if (comScore == false) return;
        let mark_id = markList?.filter(
          (item) => item.com_score == comScore,
        )?.[0]?._id;

        updateUser(user._id, { mark_id: mark_id });
      }
      this.getList();

      if (user.user_type == 3) {
        this.getList();
      }

      message.success('登录成功');
      history.push('/');
    } catch (error) {}
  };

  render = () => {
    return (
      <div className={styles.login}>
        <LoginForm
          logo={require('@/assets/logo.png')}
          title="智能分析系统"
          subTitle="关于学生课程学习效果的智能分析系统"
          onFinish={this.varifyUserInfo}
        >
          <ProFormText
            name="phone"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'手机'}
            rules={[
              {
                required: true,
                message: '请输入手机!',
              },
            ]}
          />
          <ProFormText.Password
            name="pwd"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'密码'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </LoginForm>
      </div>
    );
  };
}
