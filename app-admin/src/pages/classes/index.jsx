import React from 'react';
import BaseTable from '@/components/base-table';
import BaseForm from '@/components/base-form';
import _ from 'lodash';
import { Popconfirm, message, Modal } from 'antd';
import graphql from '@/utils/graphql';
import { getClasses, updateClasses } from '@/services/classes';
import { IsEmpty, getComPc } from '@/utils/dict';
import { updateUser, getUserList } from '@/services/user';
import KnowCharts from './knowCharts';
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
      visible: false,
      classes: {},
    });
  }

  getList = async () => {
    let { userList } = await getUserList();

    userList.data.map(async (item) => {
      //获取用户知识点完成度
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

      //取平均值
      if (!IsEmpty(arr)) {
        let class_com_pc = _.mean(arr) * 100;

        await updateClasses(item._id, {
          com_pc: `${class_com_pc.toFixed(2)}%`,
        });
      }
    });
  };

  extendComponentDidMount = () => {
    // this.getList();
  };

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
    }
  };

  click = (record) => {
    this.setState({
      visible: true,
      classes: record,
    });
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
        render: (item, record, index) => {
          return (
            <div className="pointer" onClick={() => this.click(record)}>
              {item}
            </div>
          );
        },
      },
      // {
      //   title: '知识平均完成度',
      //   dataIndex: 'com_pc',
      //   ellipsis: true,
      // },
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

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  Modal = () => {
    return (
      <Modal
        title="班级知识完成度统计表"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={1200}
        bodyStyle={{ height: '450px' }}
      >
        <KnowCharts classes={this.state.classes} />
      </Modal>
    );
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
        }
      },
      Modal: () => {
        return (
          <Modal
            title="学生知识完成度统计表"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={1200}
            bodyStyle={{ height: '450px' }}
          >
            <KnowCharts classes={this.state.classes} />
          </Modal>
        );
      },
    };
  };

  toolBarRender = () => {
    return [
      <BaseForm
        ref={this.modalRef}
        {...this.getModalFormOptions()}
        Modal={() => this.Modal()}
      />,
    ];
  };
}
