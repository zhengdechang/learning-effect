import React from 'react';
import BaseTable from '@/components/base-table';
import BaseForm from '@/components/base-form';
import _ from 'lodash';
import { Popconfirm, message } from 'antd';
import graphql from '@/utils/graphql';
import { getUserList } from '@/services/user';
import { getSignList } from '@/services/sign';
import { addExam, getExamList } from '@/services/exam';

export default class Component extends BaseTable {
  modalRef = React.createRef();

  constructor(props) {
    super(props);
    _.assign(this.state, {
      headerTitle: '签到列表',
      rowKey: '_id',
      userList: [],
      config: {
        search: false,
      },
    });
  }

  handleDelete = async (ids) => {
    const query = `mutation DelExam($ids: [ID]) {
      delExam(ids: $ids)
    }`;
    const variables = {
      ids,
    };

    try {
      await graphql(query, variables);
      message.success('删除成功');
      this.actionRef.current.reload();
    } catch (error) {
      message.error('删除失败');
      console.error(error);
    }
  };

  getColumns = () => {
    return [
      {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        ellipsis: true,
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
        title: '签到时间',
        dataIndex: 'sign_in',
        ellipsis: true,
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
        title: '签退时间',
        dataIndex: 'sign_out',
        ellipsis: true,
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
        title: '签到时长',
        dataIndex: 'date',
        ellipsis: true,
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
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => [
          <Popconfirm
            key="popconfirm"
            placement="rightTop"
            title="确认删除该班级？"
            okText="删除"
            cancelText="取消"
            onConfirm={this.handleDelete.bind(this, [record._id])}
          >
            <a>删除</a>
          </Popconfirm>,
        ],
      },
    ];
  };

  getData = async (params = {}) => {
    let user = await getUserList();

    let userList = user?.userList?.data;
    console.log(userList);
    userList = _.map(
      userList.filter((item) => item.user_type == '3'),
      ({ _id, name }) => ({
        value: _id,
        label: name,
      }),
    );

    this.setState({
      userList,
    });

    const { current, pageSize, ...filters } = params;
    const res = await getSignList(filters, current, pageSize);
    return res;
  };

  getModalFormOptions = () => {
    return {
      type: 'modal',
      columns: [
        [
          {
            type: 'select',
            width: 'sm',
            name: 'user_id',
            label: '姓名',
            options: this.state.userList,
            placeholder: '请输入姓名',
            showSearch: true,
            rules: [
              {
                required: true,
                message: '请输入姓名',
              },
            ],
          },
          {
            type: 'dateTimePicker',
            width: 'sm',
            name: 'sign_in',
            label: '签到时间',
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
            type: 'dateTimePicker',
            width: 'sm',
            name: 'sign_out',
            label: '签退时间',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
          },
        ],
      ],
      handleSubmit: async () => {
        const formRef = this.modalRef.current?.formRef;
        const validateValue = await formRef.current?.validateFields();
        await addExam(validateValue);
        this.actionRef.current.reload();
        formRef.current?.resetFields();
        return true;
      },
    };
  };

  toolBarRender = () => {
    return [<BaseForm ref={this.modalRef} {...this.getModalFormOptions()} />];
  };
}
