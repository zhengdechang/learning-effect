import React from 'react';
import BaseForm from '@/components/base-form';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { Descriptions, message } from 'antd';
import { getConfig, getUser } from '@/utils/dict';
import { getClasses } from '@/services/classes';
import { getMarkList } from '@/services/mark';
import { getInfoList } from '@/services/info';

import graphql from '@/utils/graphql';
import { history } from 'umi';
import _ from 'lodash';

class ChangePassword extends BaseForm {
  constructor(props) {
    super(props);
    _.assign(this.state, {
      type: 'modal',
    });
  }

  extendComponentDidMount = async () => {};

  handleSubmit = async () => {
    const validateValue = await this.formRef.current?.validateFields();

    const query = `mutation UpdateUser($id: ID, $user: UserInput, $filters: Filters){
      updateUser(id: $id, user: $user, filters: $filters)
    }`;

    const variables = {
      id: this.props.user?._id,
      user: {
        pwd: validateValue?.cur_new_pwd,
      },
      filters: {
        pwd: validateValue.old_pwd,
      },
    };

    try {
      await graphql(query, variables);
      message.success('修改成功');
      localStorage.clear();
      sessionStorage.clear();
      history.push('/login');
      return true;
    } catch (error) {}
  };

  getColumns = () => {
    return [
      {
        type: 'text.password',
        name: 'old_pwd',
        label: '当前密码',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
      },
      {
        type: 'text.password',
        name: 'new_pwd',
        label: '新密码',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
      },
      {
        type: 'text.password',
        name: 'cur_new_pwd',
        label: '确认密码',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
            ({ getFieldValue }) => ({
              validator: (rule, value) => {
                if (getFieldValue('new_pwd') !== value) {
                  return Promise.reject('两次输入密码不一致');
                }
                return Promise.resolve();
              },
            }),
          ],
        },
      },
    ];
  };
}

export default class Component extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      classes: {},
      config: {},
      mark: {},
      info: {},
    };
  }

  componentDidMount = async () => {
    const user = await getUser();
    const { data: classes } = await getClasses();
    const { data: mark } = await getMarkList();
    const { data: info } = await getInfoList();
    const config = await getConfig();
    this.setState(
      {
        user,
        classes,
        mark,
        info,
        config,
      },
      () => {
        console.log(this.state.user, '123');
      },
    );
  };

  renderPersonalInfo = () => {
    return (
      <Descriptions
        title={this.state.user?.name}
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="姓名">
          {this.state.user?.name}
        </Descriptions.Item>
        <Descriptions.Item label="手机">
          {this.state.user?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="用户类型">
          {this.state.user?.user_type === this.state.config?.user_type?.super
            ? '超级管理员'
            : this.state.user?.user_type ===
              this.state.config?.user_type?.teacher
            ? '教师'
            : this.state.user?.user_type ===
              this.state.config?.user_type?.student
            ? '学生'
            : '未知用户'}
        </Descriptions.Item>
        {this.state.user?.user_type ===
          this.state.config?.user_type?.student && (
          <Descriptions.Item label="班级">
            {_.get(
              _.filter(this.state.classes, {
                _id: this.state.user?.classes_id,
              }),
              '[0].classes_name',
              '未分班',
            )}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="密码">
          <div style={{ display: 'flex' }}>
            ******
            <ChangePassword user={this.state.user}>
              <a style={{ marginLeft: 10 }}>修改密码</a>
            </ChangePassword>
          </div>
        </Descriptions.Item>
        {this.state.user?.user_type ===
          this.state.config?.user_type?.student && (
          <Descriptions.Item label="我的标签">
            {_.get(
              _.filter(this.state.mark, {
                _id: this.state.user?.mark_id,
              }),
              '[0].mark_name',
              '未有标签',
            )}
          </Descriptions.Item>
        )}
        {this.state.user?.user_type ===
          this.state.config?.user_type?.student && (
          <Descriptions.Item label="我的通知" span={3}>
            {this.state.user?.info_id &&
              this.state.user?.info_id?.split(',')?.map((item, index) => {
                return (
                  <div>
                    {index +
                      1 +
                      '.' +
                      _.get(
                        _.filter(this.state.info, {
                          _id: item,
                        }),
                        `[0].info_name`,
                        '未有通知',
                      )}
                  </div>
                );
              })}
          </Descriptions.Item>
        )}
      </Descriptions>
    );
  };

  render = () => {
    return (
      <PageContainer
        header={{
          title: '我的主页',
        }}
      >
        <ProCard>{this.renderPersonalInfo()}</ProCard>
      </PageContainer>
    );
  };
}
