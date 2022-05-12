import React from 'react';
import BaseForm from '@/components/base-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Popconfirm, message } from 'antd';
import graphql from '@/utils/graphql';
import { history } from 'umi';
import styles from './edit.less';
import Detail from './detail';
import { delPaper } from '@/services/paper';
import { getConfig } from '@/utils/dict';
import { connect } from 'dva';
import moment from 'moment';
import { getKnowList } from '@/services/know';
class QuestionForm extends BaseForm {
  constructor(props) {
    super(props);
    _.assign(this.state, {
      showSelectForm: false,
      type: 'modal',
      className: styles.QuestionForm,
      know: [],
    });
  }

  extendComponentDidMount = async () => {
    let { data: know } = await getKnowList();
    know = _.map(know, (item) => {
      return { value: item?._id, label: item?.know_name };
    });

    this.setState({
      know,
    });
  };

  handleSubmit = async () => {
    const validateValue = await this.formRef.current?.validateFields();
    const { question_title, options, ...value } = validateValue;
    value.question_content = JSON.stringify(
      options
        ? {
            question_title,
            options,
          }
        : { question_title },
    );

    const query = `mutation AddQuestion($question: QuestionInput){
      addQuestion(question: $question){
        _id
        paper_id
        question_type
        question_content
        question_value
        question_score
        know
        know_score
      }
    }`;

    const variables = {
      question: {
        ...value,
        paper_id: this.props.paperId,
      },
    };

    try {
      await graphql(query, variables);
      message.success('添加成功');
      this.props.handleReflushDetail();
      this.formRef.current?.resetFields();
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
          name: 'question_type',
          label: '题目类型',
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
          onChange: (value) => {
            this.setState({
              showSelectForm: value === 1,
            });
          },
        },
        {
          type: 'digit',
          width: 'number',
          name: 'question_score',
          label: '题目分值',
          addonAfter: <a>剩余 {this.props.surplusScore} 分</a>,
          formItemProps: {
            rules: [
              {
                required: true,
                message: '此项为必填项',
              },
              {
                validator: (rule, value) => {
                  if (value > this.props.surplusScore) {
                    return Promise.reject('分数不可以多于剩余分数');
                  }
                  return Promise.resolve();
                },
              },
            ],
          },
        },
        {
          type: 'select',
          width: 'sm',
          name: 'know',
          label: '知识点',
          mode: 'multiple',
          options: [...this.state.know],
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
        type: 'area',
        name: 'question_title',
        label: '题目',

        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
      },
      this.state.showSelectForm && {
        type: 'list',
        name: 'options',
        label: '选择题选项',
        children: [
          {
            type: 'text',
            name: 'option_key',
            label: '选项',
            width: 'xs',
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
            type: 'text',
            name: 'option_value',
            label: '选项内容',
            width: 'lg',
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
      },
      {
        type: 'area',
        name: 'question_value',
        label: '参考答案',
      },
    ];
  };
}

@connect((state) => {
  return {
    surplusScore: state.paper?.surplusScore,
  };
})
export default class Component extends React.Component {
  paperDetailRef = React.createRef();

  constructor(props) {
    super(props);
    this.paperId = props.match?.params?.paperId;
    this.state = {};
  }

  handlePublish = async () => {
    const config = await getConfig();
    // 发布试卷
    const query = `mutation UpdatePaper($id: ID, $paper: PaperInput) {
        updatePaper(id: $id, paper: $paper)
      }`;
    const variables = {
      id: this.paperId,
      paper: {
        paper_status: config?.paper_status?.pass,
        pass_at: moment().valueOf(),
      },
    };

    try {
      await graphql(query, variables);
      message.success('发布成功');
      history.push('/paper');
    } catch (error) {
      console.error(error);
    }
  };

  handleDelete = async () => {
    try {
      await delPaper([this.paperId]);
      message.success('删除成功');
      history.push('/paper');
      return true;
    } catch (error) {
      message.error('删除失败');
      console.error(error);
    }
  };

  handleReflushDetail = () => {
    // 刷新
    this.paperDetailRef.current?.getQuestions();
  };

  getExtra = () => {
    return [
      <QuestionForm
        key="1"
        handleReflushDetail={this.handleReflushDetail.bind(this)}
        paperId={this.paperId}
        surplusScore={this.props.surplusScore}
      >
        <Button style={{ display: 'inline-block' }}>添加题目</Button>
      </QuestionForm>,
      <Popconfirm
        key="2"
        placement="bottomRight"
        title="试卷发布后将不可修改"
        onConfirm={this.handlePublish}
        okText="确定"
        cancelText="取消"
      >
        <Button type="primary">发布试卷</Button>
      </Popconfirm>,
      <Popconfirm
        key="3"
        placement="bottomRight"
        title="确认删除试卷？"
        onConfirm={this.handleDelete}
        okText="确定"
        cancelText="取消"
      >
        <Button type="primary" danger>
          删除试卷
        </Button>
      </Popconfirm>,
    ];
  };

  render = () => {
    return (
      <div>
        <PageContainer
          header={{
            title: '编辑试卷',
          }}
          extra={this.getExtra()}
        >
          <Detail
            type="edit"
            ref={this.paperDetailRef}
            paperId={this.paperId}
          />
        </PageContainer>
      </div>
    );
  };
}
