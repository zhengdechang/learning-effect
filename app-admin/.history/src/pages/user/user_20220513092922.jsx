import React from 'react';
import BaseTable from '@/components/base-table';
import BaseForm from '@/components/base-form';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm, message, Tooltip, Modal } from 'antd';
import graphql from '@/utils/graphql';
import moment from 'moment';
import _ from 'lodash';
import { getConfig } from '@/utils/dict';
import { getClasses } from '@/services/classes';
import { getMarkList } from '@/services/mark';
import { getInfoList } from '@/services/info';

class UserForm extends BaseForm {
  constructor(props) {
    super(props);
    _.assign(this.state, {
      type: 'modal',
      visible: false,
    });
  }

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
        title="Basic Modal"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  };

  getColumns = () => {
    return [
      [
        {
          type: 'text',
          width: 'sm',
          name: 'phone',
          label: '手机号',
          placeholder: '请输入手机号',
          addonAfter: (
            <Tooltip placement="right" title="初始密码为手机号后六位">
              <a>
                <QuestionCircleOutlined />
              </a>
            </Tooltip>
          ),
          rules: [
            {
              required: true,
              message: '请输入手机号',
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误',
            },
          ],
        },
        {
          type: 'text',
          width: 'sm',
          name: 'name',
          label: '姓名',
          placeholder: '请输入姓名',
          rules: [
            {
              required: true,
              message: '请输入姓名',
            },
          ],
        },
        this.props?.userType === this.props.config?.user_type?.student && {
          type: 'select',
          width: 'sm',
          name: 'classes_id',
          label: '班级',
          options: this.props.classes,
          formItemProps: {
            rules: [
              {
                required: true,
                message: '此项为必填项',
              },
            ],
          },
        },
        this.props?.userType === this.props.config?.user_type?.student && {
          type: 'select',
          width: 'sm',
          name: 'mark_id',
          label: '标签',
          options: this.props.mark,
          // formItemProps: {
          //   rules: [
          //     {
          //       required: true,
          //       message: '此项为必填项',
          //     },
          //   ],
          // },
        },
        this.props?.userType === this.props.config?.user_type?.student && {
          type: 'select',
          width: 'sm',
          name: 'info_id',
          label: '通知',
          options: this.props.info,
          mode: 'multiple',
          showSearch: true,
        },
      ],
    ];
  };

  handleSubmit = async () => {
    const validateValue = await this.formRef.current?.validateFields();
    // await this.formRef.current?.validateFieldsReturnFormatValue?.();
    const addQuery = `mutation AddUser($user: UserInput) {
      addUser(user: $user){
        _id
        phone
        name
        user_type
        created_at
        classes_id
        mark_id
        info_id
      }
    }`;
    const addVariables = {
      user: {
        ...validateValue,
        user_type: this.props.userType,
        info_id: validateValue?.info_id?.join(','),
        created_at: moment().valueOf().toString(),
      },
    };

    const updateQuery = `mutation UpdateUser($id: ID, $user: UserInput){
      updateUser(id: $id, user: $user)
    }`;
    const updateVariables = {
      id: this.props.initialValues?._id,
      user: {
        ...validateValue,
        info_id: validateValue?.info_id?.join(','),
      },
    };

    try {
      await graphql(
        _.isEmpty(this.props.initialValues) ? addQuery : updateQuery,
        _.isEmpty(this.props.initialValues) ? addVariables : updateVariables,
      );
      message.success(
        _.isEmpty(this.props.initialValues) ? '添加成功' : '修改成功',
      );
      this.props.preRef.current?.reload();
      this.formRef.current?.resetFields();
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  // render = () => {
  //   return (
  //     <div>
  //       <Modal
  //         title="Basic Modal"
  //         visible={true}
  //         // onOk={handleOk}
  //         // onCancel={handleCancel}
  //       >
  //         <p>Some contents...</p>
  //         <p>Some contents...</p>
  //         <p>Some contents...</p>
  //       </Modal>
  //     </div>
  //   );
  // };
}

export default class Component extends BaseTable {
  constructor(props) {
    super(props);
    _.assign(this.state, {
      headerTitle: '用户列表',
      rowKey: '_id',
      userType: 0,
      otherColumns: [],
      config: {},
      classes: [],
      mark: [],
      info: [],
    });
  }

  extendComponentDidMount = async () => {
    const config = await getConfig();
    this.setUserType(config);

    let { data: classes } = await getClasses();
    classes = _.map(classes, ({ _id, classes_name }) => ({
      value: _id,
      label: classes_name,
    }));

    let { data: mark } = await getMarkList();
    mark = _.map(mark, ({ _id, mark_name }) => ({
      value: _id,
      label: mark_name,
    }));

    let { data: info } = await getInfoList();
    info = _.map(info, ({ _id, info_name }) => ({
      value: _id,
      label: info_name,
    }));

    this.setState({
      config,
      classes,
      mark,
      info,
    });
  };

  setUserType = () => {};

  handleDelete = async (ids) => {
    const query = `mutation DelUser($ids: [ID]) {
      delUser(ids: $ids)
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
    const columns = [
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
        render: (item, record, index) => {
          return <a style={{ color: '#189df', cursor: 'pointer' }}>{item}</a>;
        },
      },
      {
        title: '手机',
        dataIndex: 'phone',
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
        title: '创建时间',
        key: 'showTime',
        dataIndex: 'created_at',
        valueType: 'dateTime',
        hideInSearch: true,
        renderText: (text) => {
          return moment(parseInt(text)).format('YYYY-MM-DD HH:mm');
        },
      },
      // {
      //   title: '创建时间',
      //   dataIndex: 'created_at',
      //   valueType: 'dateRange',
      //   hideInTable: true,
      //   search: {
      //     transform: (value) => {
      //       return {
      //         startTime: value[0],
      //         endTime: value[1],
      //       };
      //     },
      //   },
      // },
      ...this.state.otherColumns,
      {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => [
          <UserForm
            key="1"
            preRef={this.actionRef}
            config={this.state.config}
            userType={this.state.userType}
            classes={this.state.classes}
            mark={this.state.mark}
            info={this.state.info}
            initialValues={record}
          >
            <a>编辑</a>
          </UserForm>,
          <Popconfirm
            key="2"
            placement="rightTop"
            title="确认删除？"
            okText="删除"
            cancelText="取消"
            onConfirm={this.handleDelete.bind(this, [record._id])}
          >
            <a>删除</a>
          </Popconfirm>,
        ],
      },
    ];

    if (this.state?.userType === this.state.config?.user_type?.student) {
      columns.splice(
        3,
        0,
        {
          title: '班级',
          dataIndex: 'classes_id',
          valueType: 'select',
          filters: true,
          onFilter: true,
          valueEnum: (() => {
            const res = {};
            _.forEach(
              this.state.classes,
              ({ value, label }) => (res[value] = { text: label }),
            );
            return res;
          })(),
        },
        {
          title: '标签',
          dataIndex: 'mark_id',
          valueType: 'select',
          filters: true,
          onFilter: true,
          valueEnum: (() => {
            const res = {};
            _.forEach(
              this.state.mark,
              ({ value, label }) => (res[value] = { text: label }),
            );
            return res;
          })(),
        },
      );
    }

    return columns;
  };

  getData = async (params = {}) => {
    const { current, pageSize, startTime, endTime, ...filters } = params;
    const query = `query UserList( $filters: Filters, $current: Int, $pageSize: Int){
      userList(current: $current, pageSize: $pageSize, filters: $filters){
        data {
          _id
          phone
          name
          user_type
          created_at
          classes_id
          mark_id
          info_id
        }
        total
      }
    }`;

    // 后续请求 configs 获取
    if (this.state.userType) {
      filters.user_type = this.state.userType;
    }

    const variables = {
      // current,
      // pageSize,
      filters: {
        ...filters,
        startTime: startTime && moment(startTime).valueOf().toString(),
        endTime: endTime && moment(endTime).valueOf().toString(),
      },
    };

    let res;
    try {
      res = await graphql(query, variables);
    } catch (error) {
      console.error(error);
    }
    console.log(res?.userList?.data, '111');

    return {
      total: res?.userList?.total,
      data: res?.userList?.data.map((item) => {
        return {
          ...item,
          info_id: item.info_id?.split(','),
        };
      }),
      status: 'success',
    };
  };

  toolBarRender = () => {
    return [
      <UserForm
        preRef={this.actionRef}
        config={this.state.config}
        userType={this.state.userType}
        classes={this.state.classes}
        mark={this.state.mark}
        info={this.state.info}
      />,
    ];
  };
}
