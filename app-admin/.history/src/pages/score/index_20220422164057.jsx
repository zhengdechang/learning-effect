import React from 'react';
import BaseTable from '@/components/base-table';
import BaseForm from '@/components/base-form';
import _ from 'lodash';
import { Popconfirm, message } from 'antd';
import graphql from '@/utils/graphql';
import { getUserList } from '@/services/user';
import { getPapers } from '@/services/paper';
import { addExam } from '@/services/exam';

export default class Component extends BaseTable {
  modalRef = React.createRef();

  constructor(props) {
    super(props);
    _.assign(this.state, {
      headerTitle: '成绩列表',
      rowKey: '_id',
      userList: [],
      paperList: [],
      config: {
        search: false,
      },
    });
  }

  handleDelete = async (ids) => {
    const query = `mutation DelClasses($ids: [ID]) {
      delClasses(ids: $ids)
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
        title: '试卷',
        dataIndex: 'paper_title',
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
        title: '班级',
        dataIndex: 'classes_id',
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
        title: '成绩',
        dataIndex: 'sum_score',
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

  getData = async () => {
    let user = await getUserList();

    console.log(user);
    let userList = user?.userList?.data;
    console.log(userList);
    userList = _.map(
      userList.filter((item) => item.user_type == '3'),
      ({ _id, name }) => ({
        value: _id,
        label: name,
      }),
    );

    let { data: paperList } = await getPapers();
    paperList = _.map(
      paperList.filter((item) => item.paper_status == '1'),
      ({ _id, paper_title }) => ({
        value: _id,
        label: paper_title,
      }),
    );

    this.setState({
      userList,
      paperList,
    });
  };

  getModalFormOptions = () => {
    return {
      type: 'modal',
      columns: [
        [
          {
            type: 'select',
            width: 'sm',
            name: 'paper_id',
            label: '试卷',
            showSearch: true,
            placeholder: '请选择试卷名称',
            options: this.state.paperList,
            rules: [
              {
                required: true,
                message: '请选择试卷名称',
              },
            ],
          },
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
            type: 'text',
            width: 'sm',
            name: 'sum_score',
            label: '成绩',
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
        console.log('111', validateValue);
        await addExam(validateValue);
        console.log(this.actionRef.current);
        this.actionRef.current.reload();
        // formRef.current?.resetFields();
      },
    };
  };

  toolBarRender = () => {
    return [
      <BaseForm
        ref={this.modalRef}
        preRef={this.actionRef}
        {...this.getModalFormOptions()}
      />,
    ];
  };
}
