import React from "react";
import { message, Button } from 'antd';
import { ProFormCascader } from '@ant-design/pro-form';
import ProForm, {
  ModalForm,
  DrawerForm,
  ProFormCheckbox,
  ProFormCaptcha,
  ProFormDigit,
  ProFormDigitRange,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
  ProFormTimePicker,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
  ProFormRadio,
  ProFormRate,
  ProFormSelect,
  ProFormSlider,
  ProFormSwitch,
  ProFormMoney,
  ProFormUploadDragger,
  ProFormUploadButton,
  ProFormList,
  ProFormDependency,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';

export default class Component extends React.PureComponent{
  formRef = React.createRef();

  constructor(props){
    super(props);
    this.state = {
      // 样式类名
      className: props.className || '',
      // 表单类型
      type: props.type || 'default',
      // ProForm 配置项
      options: {},
    };
  }

  componentDidMount = () => {
    this.componentExtendDidMount();
    this.extendComponentDidMount();
  }

  componentExtendDidMount = () => {

  }

  extendComponentDidMount = async () => {}

  /**
   * @description 提交表单
   * @param {*} values
   */
  handleSubmit = async (values) => {
    console.log(values);
    const val1 = await this.formRef.current?.validateFields();
    console.log('validateFields:', val1);
    const val2 = await this.formRef.current?.validateFieldsReturnFormatValue?.();
    console.log('validateFieldsReturnFormatValue:', val2);
    message.success('提交成功');
  }

  /**
   * @description 配置表单示例
   * @returns []
   */
  getColumns = () => {
    /**
     * [
     *    [{},{},...], 为一组 带ProForm.Group包裹
     *    {}, 为一项 无ProForm.Group包裹
     * ]
     */
    return [
      [
        {
          type: "text",
          width: "md",
          name: "name",
          label: "签约客户名称",
          placeholder: "请输入名称",
          addonAfter: (<a>点击查看更多</a>),
          addonBefore: (<a>客户名称应该怎么获得？</a>),
          tooltip: '最长为 24 位',
          rules: [{ required: true, message: '这是必填项' }],
        },
        {
          type: "text",
          width: "md",
          name: "company",
          label: "我方公司名称",
          placeholder: "请输入名称",
        }
      ],
      {
        type: "digit",
        width: "lg",
        name: "count",
        label: "人数",
      },
      [
        {
          type: "text",
          width: "md",
          name: ['contract', 'name'],
          label: "合同名称",
          placeholder: "请输入名称",
        },
        {
          type: "dateRangePicker",
          width: "md",
          name: ['contract', 'name'],
          label: "合同生效时间",
        }
      ],
      [
        {
          type: "select",
          width: "xs",
          name: "useMode",
          label: "合同约定生效方式",
          options: [
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ],
          readonly: true,
          cacheForSwr: true,
        },
        {
          type: "select",
          width: "xs",
          name: "unusedMode",
          label: "合同约定失效方式",
          options: [
            {
              value: 'time',
              label: '履行完终止',
            },
          ],
        },
        {
          type: "money",
          width: "md",
          name: "money",
          label: "合同约定金额",
          fieldProps: {
            numberPopoverRender: true,
          },
        }
      ],
      {
        type: "text",
        width: "sm",
        name: "id",
        label: "主合同编号",
      },
      {
        type: "text",
        width: "md",
        name: "project",
        label: "项目名称",
        initialValue: "xxxx项目",
        disabled: true,
      },
      {
        type: "text",
        width: "xs",
        name: "mangerName",
        label: "商务经理",
        initialValue: "启途",
        disabled: true,
      },
      {
        type: "cascader",
        width: "md",
        name: "area",
        label: "区域",
        initialValue: ['zhejiang', 'hangzhou', 'xihu'],
        request: async () => [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ]
      },
    ];
  }

  /**
   * @description 渲染 getColumns
   * @returns ReactDom
   */
  renderFromGroups = (columns) => {
    const renderColumn = (columnOptions, idx) => {
      const type = _.get(columnOptions, 'type');
      delete columnOptions.type;

      return (<div key={idx}>
        {type === 'text' && <ProFormText {...columnOptions} />}
        {type === 'text.password' && <ProFormText.Password {...columnOptions} />}
        {type === 'area' && <ProFormTextArea {...columnOptions} />}
        {type === 'captcha' && <ProFormCaptcha {...columnOptions} />}
        {type === 'digit' && <ProFormDigit {...columnOptions} />}
        {type === 'digitRange' && <ProFormDigitRange {...columnOptions} />}
        {type === 'select' && <ProFormSelect {...columnOptions} />}
        {type === 'money' && <ProFormMoney {...columnOptions} />}
        {type === 'cascader' && <ProFormCascader {...columnOptions} />}
        {type === 'datePicker' && <ProFormDatePicker {...columnOptions} />}
        {type === 'dateTimePicker' && <ProFormDateTimePicker {...columnOptions} />}
        {type === 'dateRangePicker' && <ProFormDateRangePicker {...columnOptions} />}
        {type === 'dateTimeRangePicker' && <ProFormDateTimeRangePicker {...columnOptions} />}
        {type === 'timePicker' && <ProFormTimePicker {...columnOptions} />}
        {type === 'treeSelect' && <ProFormTreeSelect {...columnOptions} />}
        {type === 'checkbox' && <ProFormCheckbox {...columnOptions} />}
        {type === 'radio.group' && <ProFormRadio.Group {...columnOptions} />}
        {type === 'switch' && <ProFormSwitch {...columnOptions} />}
        {type === 'rate' && <ProFormRate {...columnOptions} />}
        {type === 'slider' && <ProFormSlider {...columnOptions} />}
        {type === 'uploadDragger' && <ProFormUploadDragger {...columnOptions} />}
        {type === 'uploadButton' && <ProFormUploadButton {...columnOptions} />}
        {type === 'dependency' && <ProFormDependency {...columnOptions}>
          {_.get(columnOptions, 'slot', () => {})}
        </ProFormDependency>}
      </div>);
    };

    return _.map(columns, (group, idx) => {
      if(_.isArray(group)){
        // ProForm.Group
        return (<ProForm.Group key={idx}>
          {
            _.map(group, (columnOptions, index) => {
              return renderColumn(columnOptions, index);
            })
          }
        </ProForm.Group>);
      } else {
        const columnOptions = group;

        // 数据联动渲染 ProFormList
        if(_.get(columnOptions, 'type') === 'list') {
          const children = _.get(columnOptions, 'children');
          delete columnOptions.type;
          delete columnOptions.children;

          return (<ProFormList key={idx} {...columnOptions}>
            <ProForm.Group>
              {this.renderFromGroups([children])}
            </ProForm.Group>
          </ProFormList>);
        }

        return renderColumn(columnOptions, idx);
      }
    });
  }

  renderFormPageHeader = () => {}

  renderFormPageFooter = () => {}

  /**
   * @description 根据Form类型渲染
   * @returns ReactNode
   */
  renderForm = () =>{
    let options = {
      formRef: this.formRef,
      params: { id: '100' },
      formKey: "base-form-use-demo",
      autoFocusFirstInput: true,
    };

    // 浮层表单
    if(this.state.type === 'modal') {
      options = {
        ...options,
        modalProps: {
          onCancel: () => console.log('run'),
        },
        trigger: this.props.children || (<Button type="primary">
          <PlusOutlined />
          新建
        </Button>),
      };
    } else if (this.state.type === 'drawer') {
      options = {
        ...options,
        drawerProps: {
          destroyOnClose: true,
        },
        trigger: this.props.children || (<Button type="primary">
          <PlusOutlined />
          新建
        </Button>),
      };
    }

    options = {
      ...options,
      onFinish: this.props.handleSubmit || this.handleSubmit,
      ...this.state.options,
      ...this.props.options,
    }

    if(this.props.initialValues || this.state.initialValues){
      options.initialValues = this.props.initialValues || this.state.initialValues;
    }  else if(this.props.request || this.request) {
      options.request = this.props.request || this.request;
    }

    const columns = this.props.columns || this.getColumns();
    return (<>
      {this.state.type === 'default' && <ProForm {...options}>{this.renderFromGroups(columns)}</ProForm>}
      {this.state.type === 'modal' && <ModalForm {...options}>{this.renderFromGroups(columns)}</ModalForm>}
      {this.state.type === 'drawer' && <DrawerForm {...options}>{this.renderFromGroups(columns)}</DrawerForm>}
    </>);
  }

  render = () => {
    return (<div className={this.state.className}>
      {this.renderFormPageHeader()}
      {this.renderForm()}
      {this.renderFormPageFooter()}
    </div>);
  }
}
