import React from 'react';
import BaseTable from '@/components/base-table';
import BaseForm from '@/components/base-form';
import _ from 'lodash';
import { Popconfirm, message } from 'antd';
import graphql from '@/utils/graphql';
import { addKnow, getKnowList, updateKnow } from '@/services/know';

class UserForm extends BaseForm {
  constructor(props) {
    super(props);
    _.assign(this.state, {
      type: 'modal',
    });
  }

  getOpt = () => {
    let arr = [];
    for (let i = 1; i < 11; i++) {
      arr = [
        ...arr,
        {
          value: i,
          label: i + '分',
        },
      ];
    }
    return arr;
  };

  getColumns = () => {
    return [
      {
        type: 'text',
        width: 'sm',
        name: 'know_name',
        label: '知识点名称',
        showSearch: true,
        placeholder: '请输入知识点名称',
        rules: [
          {
            required: true,
            message: '请输入知识点名称',
          },
        ],
      },
      // {
      //   type: 'select',
      //   width: 'sm',
      //   name: 'com_score',
      //   label: '综合分数',
      //   placeholder: '请选择综合分数',
      //   options: this.getOpt(),
      //   rules: [
      //     {
      //       required: true,
      //       message: '请选择综合分数',
      //     },
      //   ],
      // },
    ];
  };

  handleSubmit = async () => {
    const validateValue = await this.formRef.current?.validateFields();
    await updateKnow(this.props.initialValues?._id, validateValue);

    this.props.preRef.current?.reload();
    this.formRef.current?.resetFields();
    return true;
  };
}

export default class Component extends BaseTable {
  modalRef = React.createRef();
  modalRefEdit = React.createRef();

  getOpt = () => {
    let arr = [];
    for (let i = 1; i < 11; i++) {
      arr = [
        ...arr,
        {
          value: i,
          label: i + '分',
        },
      ];
    }
    return arr;
  };

  constructor(props) {
    super(props);
    _.assign(this.state, {
      headerTitle: '知识点列表',
      rowKey: '_id',
      userList: [],
      paperList: [],
      config: {
        search: false,
      },
    });
  }

  handleDelete = async (ids) => {
    const query = `mutation DelKnow($ids: [ID]) {
      delKnow(ids: $ids)
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
    }
  };

  getModalFormOptions = () => {
    return {
      type: 'modal',
      columns: [
        [
          {
            type: 'text',
            width: 'sm',
            name: 'know_name',
            label: '知识点名称',
            showSearch: true,
            placeholder: '请输入知识点名称',
            rules: [
              {
                required: true,
                message: '请输入知识点名称',
              },
            ],
          },
        ],
      ],
      handleSubmit: async () => {
        const formRef = this.modalRef.current?.formRef;
        const validateValue = await formRef.current?.validateFields();
        await addKnow(validateValue);
        this.actionRef.current.reload();
        formRef.current?.resetFields();

        return true;
      },
    };
  };

  getColumns = () => {
    return [
      {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
      },
      {
        title: '知识点名称',
        dataIndex: 'know_name',
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
      // {
      //   title: '综合分数',
      //   dataIndex: 'com_score',
      //   ellipsis: true,
      // },
      {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => {
          console.log(record, 'record');
          return [
            <UserForm key="1" preRef={this.actionRef} initialValues={record}>
              <a>编辑</a>
            </UserForm>,
            <Popconfirm
              key="popconfirm"
              placement="rightTop"
              title="确认删除该知识点？"
              okText="删除"
              cancelText="取消"
              onConfirm={this.handleDelete.bind(this, [record._id])}
            >
              <a>删除</a>
            </Popconfirm>,
          ];
        },
      },
    ];
  };

  getData = async (params = {}) => {
    const { current, pageSize, ...filters } = params;
    const res = await getKnowList(filters, current, pageSize);
    return res;
  };

  toolBarRender = () => {
    return [<BaseForm ref={this.modalRef} {...this.getModalFormOptions()} />];
  };
}
