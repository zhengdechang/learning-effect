import React from 'react';
import BaseTable from '@/components/base-table';
import BaseForm from '@/components/base-form';
import _ from 'lodash';
import { Popconfirm, message } from 'antd';
import graphql from '@/utils/graphql';
import { getClasses, updateClasses } from '@/services/classes';

export default class Component extends BaseTable {
  modalRef = React.createRef();

  constructor(props) {
    super(props);
    _.assign(this.state, {
      headerTitle: '班级列表',
      rowKey: '_id',
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
        title: '班级名称',
        dataIndex: 'classes_name',
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
        title: '知识平均完成度',
        dataIndex: 'com_pc',
        ellipsis: true,
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
    const { current, pageSize, ...filters } = params;
    const { total, data } = await getClasses(filters, current, pageSize);
    return {
      total,
      data,
      status: 'success',
    };
  };

  getModalFormOptions = () => {
    return {
      type: 'modal',
      columns: [
        {
          type: 'text',
          width: 'md',
          name: 'classes_name',
          label: '班级',
          placeholder: '请输入班级',
          rules: [
            {
              required: true,
              message: '请输入班级',
            },
          ],
        },
      ],
      handleSubmit: async () => {
        const formRef = this.modalRef.current?.formRef;
        const validateValue = await formRef.current?.validateFields();
        // await formRef.current?.validateFieldsReturnFormatValue?.();
        const query = `mutation AddClasses($classes: ClassesInput) {
          addClasses(classes: $classes){
            _id
            classes_name
          }
        }`;
        const variables = {
          classes: { ...validateValue },
        };

        try {
          await graphql(query, variables);
          message.success('添加成功');
          this.actionRef.current.reload();
          formRef.current?.resetFields();

          // await updateClasses('622b2022975a2a6948676d96', { com_pc: '1234' });

          return true;
        } catch (error) {
          message.error('添加失败');
          console.error(error);
        }
      },
    };
  };

  toolBarRender = () => {
    return [<BaseForm ref={this.modalRef} {...this.getModalFormOptions()} />];
  };
}
