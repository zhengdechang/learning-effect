import BaseTable from '@/components/base-table';
import BaseForm from '@/components/base-form';
import _ from 'lodash';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { NavLink, history } from 'umi';
import moment from 'moment';
import graphql from '@/utils/graphql';
import { getUser, getConfig } from '@/utils/dict';
import { getClasses } from '@/services/classes';
import { getPapers, delPaper } from '@/services/paper';

class PaperForm extends BaseForm {
  constructor(props) {
    super(props);
    _.assign(this.state, {
      showSelectForm: false,
      type: 'modal',
      classes: [],
      optionType: props.optionType || 'add',
      initialValues: this.props.initialValues,
    });
  }

  extendComponentDidMount = async () => {
    let { data: classes } = await getClasses();
    classes = _.map(classes, (item) => {
      return { value: item?._id, label: item?.classes_name };
    });

    this.setState({
      classes,
    });
  };

  handleSubmit = async () => {
    const validateValue = await this.formRef.current?.validateFields();

    const addQuery = `mutation AddPaper($paper: PaperInput){
      addPaper(paper: $paper){
        _id
        paper_title
        paper_type
        created_at
        pass_at
        name
        paper_points
        paper_status
        paper_time
        paper_for_classes
      }
    }`;

    const updateQuery = `mutation UpdatePaper($id: ID, $paper: PaperInput){
      updatePaper(id: $id, paper: $paper)
    }`;

    const addVariables = {
      paper: {
        ...validateValue,
        created_at: moment().valueOf(),
        // user_id 在后端验证 token 解析获取
      },
    };

    const updateVariables = {
      id: this.state.initialValues?._id,
      paper: {
        ...validateValue,
      },
    };

    try {
      const { addPaper: paper } = await graphql(
        this.state.optionType === 'update' ? updateQuery : addQuery,
        this.state.optionType === 'update' ? updateVariables : addVariables,
      );
      message.success(
        this.state.optionType === 'update' ? '更新成功' : '添加成功',
      );

      if (this.state.optionType === 'add') {
        history.push(`/paper/edit/${paper?._id}`);
      } else if (this.state.optionType === 'update') {
        this.props.preRef?.current.reload();
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  getColumns = () => {
    return [
      [
        {
          type: 'select',
          width: 'sm',
          name: 'paper_type',
          label: '试卷类型',
          options: [
            {
              value: 1,
              label: '选择题',
            },
            {
              value: 2,
              label: '填空题',
            },
            {
              value: 3,
              label: '简答题',
            },
          ],
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
          type: 'digit',
          width: 'number',
          name: 'paper_score',
          label: '卷面总分',
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
          type: 'digit',
          width: 'number',
          name: 'paper_time',
          label: '考试时长',
          addonAfter: <>分钟</>,
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
      {
        type: 'text',
        name: 'paper_title',
        label: '试卷标题',
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
        type: 'area',
        name: 'paper_points',
        label: '考查内容',
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
        type: 'select',
        name: 'paper_for_classes',
        label: '参考班级',
        mode: 'multiple',
        options: [...this.state.classes],
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
      },
    ];
  };
}

export default class Component extends BaseTable {
  constructor(props) {
    super(props);
    _.assign(this.state, {
      headerTitle: '试卷列表',
      rowKey: '_id',
      user: {},
      config: {},
    });
  }

  extendComponentDidMount = async () => {
    const user = await getUser();
    const config = await getConfig();
    this.setState({
      user,
      config,
    });
  };

  handleDelete = async (ids) => {
    try {
      await delPaper(ids);
      message.success('删除成功');
      this.actionRef.current.reload();
    } catch (error) {
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
        title: '试卷标题',
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
        title: '考察内容',
        dataIndex: 'paper_points',
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '卷面总分',
        key: 'showTime',
        dataIndex: 'paper_score',
        hideInSearch: true,
        renderText: (text) => {
          return `${text} 分`;
        },
      },
      {
        title: '考试时长',
        key: 'showTime',
        dataIndex: 'paper_time',
        hideInSearch: true,
        renderText: (text) => {
          return `${text} 分钟`;
        },
      },
      {
        title: '创建时间',
        key: 'showTime',
        dataIndex: 'created_at',
        hideInSearch: true,
        renderText: (text) => {
          return parseInt(text)
            ? moment(parseInt(text)).format('YYYY-MM-DD HH:mm')
            : '-';
        },
      },
      {
        title: '发布时间',
        key: 'showTime',
        dataIndex: 'pass_at',
        hideInSearch: true,
        renderText: (text) => {
          return parseInt(text)
            ? moment(parseInt(text)).format('YYYY-MM-DD HH:mm')
            : '-';
        },
      },
      {
        title: '发布时间',
        dataIndex: 'pass_at',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
          transform: (value) => {
            return {
              startTime: value[0],
              endTime: value[1],
            };
          },
        },
      },
      {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => {
          const options = [];

          if (
            this.state.user?.user_type === this.state.config?.user_type?.teacher
          ) {
            if (
              record?.paper_status === this.state.config?.paper_status?.nopass
            ) {
              options.push(
                <PaperForm
                  key="1"
                  initialValues={record}
                  optionType="update"
                  preRef={this.actionRef}
                >
                  <a>编辑</a>
                </PaperForm>,
              );
              options.push(
                <NavLink key="2" to={`/paper/edit/${record?._id}`}>
                  修改题目
                </NavLink>,
              );
            }
            if (
              record?.paper_status === this.state.config?.paper_status?.pass
            ) {
              options.push(
                <NavLink key="3" to={`/paper/view/${record?._id}`}>
                  预览
                </NavLink>,
              );
              options.push(
                <NavLink key="4" to={`/paper/mark/${record?._id}`}>
                  评卷
                </NavLink>,
              );
            }

            options.push(
              <Popconfirm
                key="5"
                placement="rightTop"
                title="确认删除该试卷？"
                okText="删除"
                cancelText="取消"
                onConfirm={this.handleDelete.bind(this, [record._id])}
              >
                <a>删除</a>
              </Popconfirm>,
            );
          }

          if (
            this.state.user?.user_type === this.state.config?.user_type?.student
          ) {
            if (record?.paper_status == '1') {
              options.push(
                <NavLink key="6" to={`/paper/exam/${record?._id}`}>
                  参加考试
                </NavLink>,
              );
            } else {
              options.push(
                <div key="6" to={`/paper/exam/${record?._id}`}>
                  试卷已失效
                </div>,
              );
            }
          }

          return options;
        },
      },
    ];

    if (this.state.user?.user_type === this.state.config?.user_type?.student) {
      columns.splice(3, 0, {
        title: '出卷老师',
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
      });
    }

    return columns;
  };

  getData = async (params = {}) => {
    const { current, pageSize, startTime, endTime, ...filters } = params;

    const { total, data } = await getPapers(
      {
        ...filters,
        startTime: startTime && moment(startTime).valueOf().toString(),
        endTime: endTime && moment(endTime).valueOf().toString(),
      },
      current,
      pageSize,
    );

    return {
      total,
      data,
      status: 'success',
    };
  };

  handleAddPaper = () => {
    history.push('/paper/edit');
  };

  toolBarRender = () => {
    const toolBar = [];
    if (this.state.user?.user_type === this.state.config?.user_type?.teacher) {
      toolBar.push([
        <PaperForm key="1">
          <Button type="primary">
            <PlusOutlined />
            新建
          </Button>
        </PaperForm>,
      ]);
    }
    return toolBar;
  };
}
