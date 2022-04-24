import React from 'react';
import BaseTable from '@/components/base-table';
import BaseForm from '@/components/base-form';
import _ from 'lodash';
import { Popconfirm, message } from 'antd';
import graphql from '@/utils/graphql';
import { addMark, getMarkList } from '@/services/mark';

export default class Component extends BaseTable {
  modalRef = React.createRef();

  constructor(props) {
    super(props);
    _.assign(this.state, {
      headerTitle: '标签列表',
      rowKey: '_id',
      userList: [],
      paperList: [],
      config: {
        search: false,
      },
    });
  }

  handleDelete = async (ids) => {
    const query = `mutation DelMark($ids: [ID]) {
      delMark(ids: $ids)
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
        title: '标签名称',
        dataIndex: 'mark_name',
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
        render: (text, record, _, action) => {
          console.log('record: ', record);
          return [
            <BaseForm
              key="1"
              ref={this.modalRef}
              {...this.getModalFormOptions(true)}
              initialValues={record}
            >
              <a>编辑</a>
            </BaseForm>,
            <Popconfirm
              key="popconfirm"
              placement="rightTop"
              title="确认删除该标签？"
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
    const res = await getMarkList(filters, current, pageSize);
    return res;
  };

  getModalFormOptions = (isEdit) => {
    return {
      type: 'modal',
      columns: [
        [
          {
            type: 'text',
            width: 'sm',
            name: 'mark_name',
            label: '标签名称',
            showSearch: true,
            placeholder: '请输入标签名称',
            rules: [
              {
                required: true,
                message: '请输入标签名称',
              },
            ],
          },
        ],
      ],
      handleSubmit: async () => {
        const formRef = this.modalRef.current?.formRef;
        const validateValue = await formRef.current?.validateFields();
        if (isEdit == true) {
          await addMark(validateValue);
        } else {
          await addMark(validateValue);
        }
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
