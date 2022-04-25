import React from 'react';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { history } from 'umi';
import request from '@/utils/request';
import JSEncrypt from 'jsencrypt';
import styles from './index.less';
import graphql from '@/utils/graphql';
export default class Component extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async getSignList(filters, current, pageSize) {
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
    } catch (error) {
      console.error(error);
    }
    return {
      total: res?.signList?.total,
      data: res?.signList?.data,
    };
  }

  varifyUserInfo = async (values) => {
    let publicKey;
    try {
      publicKey = await request('/api/getPublicKey', {
        method: 'GET',
      });
    } catch (error) {
      console.error(error);
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
      console.log('routes', routes);

      localStorage.setItem('token', token);
      localStorage.setItem('routes', JSON.stringify(routes));
      sessionStorage.setItem('config', JSON.stringify(config));
      sessionStorage.setItem('user', JSON.stringify(user));

      console.log('user: ', user);
      if (user.user_type == 3 && user.mark_id) {
        let signList = await this.getSignList({ user_id: user?._id });
        console.log('signList: ', signList);

        console.log('12124211', user?._id);
      }
      message.success('登录成功');
      history.push('/');
    } catch (error) {
      console.error(error);
    }
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
