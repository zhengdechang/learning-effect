import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Space  } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';


export default class Component extends React.PureComponent{

    actionRef = React.createRef();

    constructor(props){
        super(props);
        this.state = {
            pageSize: 5,
            headerTitle: '高级表格',
            rowKey: 'id',
            config: {}
        };
    }

    componentDidMount = async () => {
        this.extendComponentDidMount();
    }

    extendComponentDidMount = async () => {}

    getColumns = () => {
        return [
            {
                dataIndex: 'index',
                valueType: 'indexBorder',
                width: 48,
            },
            {
                title: '标题',
                dataIndex: 'title',
                copyable: true,
                ellipsis: true,
                tip: '标题过长会自动收缩',
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
                title: '状态',
                dataIndex: 'state',
                filters: true,
                onFilter: true,
                valueType: 'select',
                valueEnum: {
                all: { text: '全部', status: 'Default' },
                open: {
                    text: '未解决',
                    status: 'Error',
                },
                closed: {
                    text: '已解决',
                    status: 'Success',
                    disabled: true,
                },
                processing: {
                    text: '解决中',
                    status: 'Processing',
                },
                },
            },
            {
                title: '标签',
                dataIndex: 'labels',
                search: false,
                renderFormItem: (_, { defaultRender }) => {
                return defaultRender(_);
                },
                render: (_, record) => (
                <Space>
                    {record.labels.map(({ name, color }) => (
                    <Tag color={color} key={name}>
                        {name}
                    </Tag>
                    ))}
                </Space>
                ),
            },
            {
                title: '创建时间',
                key: 'showTime',
                dataIndex: 'created_at',
                valueType: 'dateTime',
                sorter: true,
                hideInSearch: true,
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
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
                render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    编辑
                </a>,
                <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                    查看
                </a>,
                <TableDropdown
                    key="actionGroup"
                    onSelect={() => action?.reload()}
                    menus={[
                    { key: 'copy', name: '复制' },
                    { key: 'delete', name: '删除' },
                    ]}
                />,
                ],
            },
        ];
    }

    getData = async (params = {}, sort, filter) => {
        console.log(params, sort, filter);
        return request('https://proapi.azurewebsites.net/github/issues', {
            params,
        });
    }

    toolBarRender = () => {
      return [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ];
    }

    renderTable = () => {
        return (<ProTable
            columns={this.getColumns()}
            actionRef={this.actionRef}
            request={this.getData}
            editable={{
              type: 'multiple',
            }}
            columnsState={{
              persistenceKey: 'pro-table-singe-demos',
              persistenceType: 'sessionStorage',
            }}
            rowKey={this.state.rowKey}
            search={{
              labelWidth: 'auto',
            }}
            form={{
              syncToUrl: (values, type) => {
                if (type === 'get') {
                  return {
                    ...values,
                    created_at: [values.startTime, values.endTime],
                  };
                }
                return values;
              },
            }}
            pagination={{
              pageSize: this.state.pageSize,
            }}
            dateFormatter="string"
            headerTitle={this.state.headerTitle}
            toolBarRender={this.toolBarRender}
            {...this.state.config}
          />);
    }

    renderHeader = () => null

    renderFooter = () => null

    render = () => {
        return (<>
            {this.renderHeader()}
            {this.renderTable()}
            {this.renderFooter()}
        </>);
    }
}