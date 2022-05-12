import React from 'react';
import graphql from '@/utils/graphql';
import ProCard from '@ant-design/pro-card';
import { Popconfirm, Button, message } from 'antd';
import _ from 'lodash';
import styles from './detail.less';
import { getPapers } from '@/services/paper';
import { getConfig, getUser } from '@/utils/dict';
import { connect } from 'dva';
// import { history } from 'umi';
import BaseForm from '@/components/base-form';

class SingleForm extends BaseForm {
  constructor(props) {
    super(props);
    _.assign(this.state, {});
  }

  extendComponentDidMount = () => {
    this.setState({
      options: {
        submitter: this.getSubmitter(),
      },
    });
  };

  getSubmitter = () => {
    return {
      // 配置按钮文本
      searchConfig: {
        resetText: '重置',
        submitText: '提交',
      },
      // 配置按钮的属性
      resetButtonProps: {
        style: {
          // 隐藏重置按钮
          display: 'none',
        },
      },
      submitButtonProps: {},

      // 完全自定义整个区域
      render: (props, doms) => {
        return [
          // <Popconfirm
          //   placement="topRight"
          //   title="确定要重置答题卡？"
          //   onConfirm={() => props.form?.resetFields()}
          //   okText="确定"
          //   cancelText="取消"
          //   key="rest"
          // >
          //   <Button type="primary" danger>
          //     重置
          //   </Button>
          // </Popconfirm>,
          // <Popconfirm
          //   placement="topRight"
          //   title="确定要提交答题卡？"
          //   onConfirm={() => props.form?.submit?.()}
          //   okText="确定"
          //   cancelText="取消"
          //   key="submit"
          // >
          //   <Button type="primary">交卷</Button>
          // </Popconfirm>,
        ];
      },
    };
  };
  getColumns = () => {
    const columns = [
      {
        type: 'select',
        width: 'xs',
        name: `item?._id`,
        // value: '111',
        // onChange: (v) => {
        //   console.log(v);
        // },
        label: ``,
        // options: _.map(item?.question_content?.options, (option) => ({
        //   value: option?.option_key,
        //   label: option?.option_key,
        // })),
        // disabled:true,
        // value:'B'
      },
    ];

    return columns;
  };
}

// 第4个参数解决ref获取不到问题
@connect((state) => ({}), null, null, { forwardRef: true })
export default class Component extends React.PureComponent {
  constructor(props) {
    super(props);
    this.paperId = this.props.paperId || this.props.match?.params?.paperId;
    this.state = {
      // 选择题
      choiceList: [],
      // 填空题
      completionList: [],
      // 简答题
      shortList: [],
      choiceScore: 0,
      completionScore: 0,
      shortScore: 0,
      questionList: [],
      paper: {},
      // 调用用途
      type: props?.type || 'view',
      user: {},
      config: {},
    };
  }

  componentDidMount = async () => {
    console.log(this.props);
    const user = await getUser();
    const config = await getConfig();
    this.setState(
      {
        user,
        config,
      },
      () => {
        this.getData();
      },
    );
  };

  getData = async () => {
    const paper = await this.getPaper();
    this.getQuestions();
    // if(this.state.type === 'edit'
    //   // 教师编辑试卷
    //   && paper?.paper_status === this.state.config?.paper_status?.nopass
    //   &&  this.state.user?._id === paper?.user_id){
    //   this.getQuestions();
    // } else if(this.state.type === 'view' && this.state.user?._id === paper?.user_id){
    //   // 教师预览试卷
    //   this.getQuestions();
    // } else if (this.state.type === 'exam'){
    //   // 学生考试
    //   this.getQuestions();
    // } else {
    //   history.push('/paper');
    //   message.warning('非法操作');
    // }
  };

  getPaper = async () => {
    const { data } = await getPapers({
      _id: this.paperId,
    });
    const paper = (!_.isEmpty(data) && data[0]) || {};
    this.setState({
      paper,
    });
    return paper;
  };

  getQuestions = async () => {
    const query = `query QuestionList($filters: Filters) {
        questionList(filters: $filters){
          _id
          paper_id
          question_type
          question_content
          question_value
          question_score
        }
      }`;
    const variables = {
      filters: {
        paper_id: this.paperId,
      },
    };

    let res;
    try {
      res = await graphql(query, variables);
    } catch (error) {
      console.error(error);
    }

    const questionList = _.get(res, 'questionList');
    this.formQuestionList(questionList);
  };

  formQuestionList = (questionList) => {
    const choiceList = [];
    const completionList = [];
    const shortList = [];
    let choiceScore = 0;
    let completionScore = 0;
    let shortScore = 0;
    _.forEach(questionList, (item) => {
      const questionType = _.get(item, 'question_type');
      if (questionType === 1) {
        choiceList.push(item);
        choiceScore += item?.question_score;
      } else if (questionType === 2) {
        completionList.push(item);
        completionScore += item?.question_score;
      } else if (questionType === 3) {
        shortList.push(item);
        shortScore += item?.question_score;
      }
    });

    this.props.dispatch({
      type: 'paper/setState',
      payload: {
        choiceList,
        completionList,
        shortList,
      },
    });

    this.setState((state) => {
      this.props.dispatch({
        type: 'paper/setState',
        payload: {
          surplusScore:
            state.paper?.paper_score -
            (choiceScore + completionScore + shortScore),
        },
      });

      return {
        questionList,
        choiceList,
        completionList,
        shortList,
        choiceScore,
        completionScore,
        shortScore,
      };
    });
  };

  handleDeleteQuestion = async (id) => {
    // 删除题目
    const query = `mutation DelQuestion($ids: [ID]){
        delQuestion(ids: $ids)
      }`;

    const variables = {
      ids: [id],
    };

    try {
      await graphql(query, variables);
      message.success('删除成功');
      this.getQuestions();
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  renderQuestion = (list) => {
    return _.map(list, (item, index) => {
      return (
        <div className={styles.questionItem} key={index}>
          <section>
            <span>{index + 1}.</span>&nbsp;
            <span>{item?.question_content?.question_title}</span>&nbsp;
            <span>（{item?.question_score} 分）</span>&nbsp;&nbsp;&nbsp;
            <span>
              <SingleForm />
            </span>
            {this.state.type == 'mark' &&
              (item?.question_type == '1' ? (
                <span>参考答案： {item?.question_value} </span>
              ) : (
                <div>参考答案： {item?.question_value} </div>
              ))}
            {this.state.type === 'edit' && (
              <Popconfirm
                key="3"
                placement="top"
                title="确认删除此题？"
                onConfirm={this.handleDeleteQuestion.bind(this, item?._id)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="link" danger>
                  删除
                </Button>
              </Popconfirm>
            )}
          </section>
          {item?.question_content?.options && (
            <ul className={styles.questionOptions}>
              {_.map(item?.question_content?.options, (option, idx) => {
                return (
                  <li key={idx}>
                    {option?.option_key}. {option?.option_value}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );
    });
  };

  renderPaper = () => {
    return (
      <div className={styles.pageDetail}>
        <header>
          <h1 className={styles.paperTitle}>{this.state.paper?.paper_title}</h1>
          <p className={styles.paperPoints}>
            考察点：{this.state.paper?.paper_points}
          </p>
          <p className={styles.paperScore}>
            总分：{this.state.paper?.paper_score} 分
          </p>
          <p className={styles.paperTime}>
            考试时长：{this.state.paper?.paper_time} 分钟
          </p>
          <p className={styles.paperCreator}>
            出题人：{this.state.paper?.name}
          </p>
        </header>

        <article>
          <section>
            <h2>一、选择题（{this.state.choiceScore} 分）</h2>
            {this.renderQuestion(this.state.choiceList)}
          </section>
          <section>
            <h2>二、填空题（{this.state.completionScore} 分）</h2>
            {this.renderQuestion(this.state.completionList)}
          </section>
          <section>
            <h2>三、简答题（{this.state.shortScore} 分）</h2>
            {this.renderQuestion(this.state.shortList)}
          </section>
        </article>
      </div>
    );
  };

  render = () => {
    return <ProCard>{this.renderPaper()}</ProCard>;
  };
}
