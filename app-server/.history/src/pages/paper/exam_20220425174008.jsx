import React from 'react';
import BaseForm from '@/components/base-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getPapers } from '@/services/paper';
import { getConfig, getUser } from '@/utils/dict';
import ProCard from '@ant-design/pro-card';
import { Descriptions, message, Button, Alert, Popconfirm } from 'antd';
import { history } from 'umi';
import graphql from '@/utils/graphql';
import Detail from './detail';
import _ from 'lodash';
import moment from 'moment';
import Marquee from 'react-fast-marquee';
import { endExam } from '@/services/exam';
import { connect } from 'dva';

class AnswerSheet extends BaseForm {
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
          <Popconfirm
            placement="topRight"
            title="确定要重置答题卡？"
            onConfirm={() => props.form?.resetFields()}
            okText="确定"
            cancelText="取消"
            key="rest"
          >
            <Button type="primary" danger>
              重置
            </Button>
          </Popconfirm>,
          <Popconfirm
            placement="topRight"
            title="确定要提交答题卡？"
            onConfirm={() => props.form?.submit?.()}
            okText="确定"
            cancelText="取消"
            key="submit"
          >
            <Button type="primary">交卷</Button>
          </Popconfirm>,
        ];
      },
    };
  };

  handleSubmit = async () => {
    const validateValue = await this.formRef.current?.validateFields();
    const answers = this.formatValue(validateValue);

    console.log(answers, '1');

    const user = await getUser();
    console.log(user, '12');

    const query = `mutation AddAnswers($answers: [AnswerInput]) {
          addAnswers(answers: $answers)
        }`;

    const variables = {
      answers: answers.map((item) => {
        return {
          ...item,
          user_id: user._id,
          exam_id: this.props.examId,
        };
      }),
    };

    try {
      this.props.handlEndtExam;
      await graphql(query, variables);
      await endExam(this.props.examId);
      message.success('交卷完成');
      history.push('/paper');
    } catch (error) {
      console.error(error);
    }
  };

  formatValue = (obj) => {
    const data = [];
    const questionDict = {};
    _.forEach(
      [
        ...this.props.choiceList,
        ...this.props.completionList,
        ...this.props.shortList,
      ],
      (item) => {
        questionDict[item._id] = item;
      },
    );

    for (let key in obj) {
      const question = questionDict[key];

      data.push({
        paper_id: question?.paper_id,
        question_id: question?._id,
        question_type: question?.question_type,
        answer_value: obj[key],
      });
    }

    return data;
  };

  getColumns = () => {
    const choiceColumns = _.map(this.props.choiceList, (item, index) => {
      return {
        type: 'select',
        width: 'xs',
        name: `${item?._id}`,
        value: '111',
        label: `选择题 ${index + 1}`,
        options: _.map(item?.question_content?.options, (option) => ({
          value: option?.option_key,
          label: option?.option_key,
        })),
        // disabled:true,
        // value:'B'
      };
    });

    const completionColumns = _.map(
      this.props.completionList,
      (item, index) => ({
        type: 'text',
        width: 'lg',
        name: `${item?._id}`,
        label: `填空题 ${index + 1}`,
        placeholder: '请输入',
      }),
    );

    const shortColumns = _.map(this.props.shortList, (item, index) => ({
      type: 'area',
      width: 'lg',
      name: `${item?._id}`,
      label: `简答题 ${index + 1}`,
      placeholder: '请输入',
    }));

    return [choiceColumns, completionColumns, shortColumns];
  };
}

@connect((state) => ({
  choiceList: state.paper.choiceList,
  completionList: state.paper.completionList,
  shortList: state.paper.shortList,
}))
export default class Component extends React.PureComponent {
  paperDetailRef = React.createRef();
  answerSheetRef = React.createRef();

  constructor(props) {
    super(props);
    this.paperId = this.props.paperId || this.props.match?.params?.paperId;
    this.state = {
      config: {},
      user: {},
      paper: {},
      examId: undefined,
      examStatus: false,
      remainTime: 0,
    };
  }

  componentDidMount = async () => {
    // 参加考试需要是试卷指定班级的学生
    // 参加过考试的学生不可以再参加考试
    const config = await getConfig();
    const user = await getUser();
    const { data } = await getPapers();

    // const paper = !_.isEmpty(data) && Array.form(data).fliter(item=>item?._id == props.match?.params?.paperId)

    const paper = data.filter((item) => {
      return item?._id == this.paperId;
    })?.[0];

    console.log(paper, 'paper');

    this.setState({
      config,
      user,
      paper,
      // 转毫秒
      remainTime: 60 * paper?.paper_time,
    });

    // 如果不是指定的参考班级的用户
    // if(!_.includes(paper?.paper_for_classes, user?.classes_id)){
    //     message.warning('非法操作');
    //     history.push('/paper');
    // }
  };

  handlEndtExam = async () => {
    // 开始考试
    const query = `mutation updateExam($exam: ExamInput){
            addExam(exam: $exam)
        }`;

    const variables = {
      id: this.state.examId,
      exam: {
        end_time: moment(),
      },
    };

    try {
      const res = await graphql(query, variables);
      console.log(res);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  timeFilter = (seconds) => {
    let ss = Math.floor(seconds); // 秒
    let mm = 0; // 分
    let hh = 0; // 小时
    if (ss > 60) {
      mm = Math.floor(ss / 60);
      ss = Math.floor(ss % 60);
    }
    if (mm > 60) {
      hh = Math.floor(mm / 60);
      mm = Math.floor(mm % 60);
    }

    let result = ('00' + Math.floor(ss)).slice(-2);
    if (mm > 0) result = ('00' + Math.floor(mm)).slice(-2) + ':' + result;
    else result = '00:' + result;

    if (hh > 0) result = ('00' + Math.floor(hh)).slice(-2) + ':' + result;
    return result;
  };

  componentWillUnmount = async () => {
    // 离开前帮交卷
    await this.answerSheetRef?.current?.props?.form?.submit?.();
    clearInterval(this.timer);
  };

  handleStartExam = async () => {
    // 开始考试
    const query = `mutation AddExam($exam: ExamInput){
            addExam(exam: $exam){
                _id
                paper_id
                user_id
                start_time
                end_time
            }
        }`;

    console.log(this.state.paper, '1');
    const variables = {
      exam: {
        paper_id: this.state.paper?._id,
        user_id: this.state.user?._id,
        start_time: moment().valueOf(),
      },
    };

    let examId;
    try {
      const res = await graphql(query, variables);
      examId = res?.addExam?._id;
    } catch (error) {
      console.error(error);
      return;
    }

    console.log(examId, 'examId');

    this.setState({
      examStatus: true,
      examId,
    });

    const self = this;
    // 计时，到时间交卷
    self.timer = window.setInterval(async () => {
      if (self.state.remainTime <= 0) {
        // 到时间交卷
        await self.answerSheetRef?.current?.props?.form?.submit?.();
        // 离开此页面
        message.warning('自动交卷');
        history.push('/paper');
      }

      self.setState((state) => ({
        remainTime: state.remainTime - 1,
      }));
    }, 1000);
  };

  renderAnswerSheet = () => {
    // 答题卡
    return (
      <ProCard style={{ marginBottom: 20 }}>
        <h1>答题卡（试卷在答题卡下方）</h1>
        <AnswerSheet
          ref={this.answerSheetRef}
          choiceList={this.props.choiceList}
          completionList={this.props.completionList}
          shortList={this.props.shortList}
          examId={this.state.examId}
          handlEndtExam={this.handlEndtExam}
        />
      </ProCard>
    );
  };

  render = () => {
    // const msg = moment.duration(this.state.remainTime).hours()
    //     +':'+moment.duration(this.state.remainTime).minutes()
    //     +':'+moment.duration(this.state.remainTime).seconds();
    return (
      <PageContainer
        header={{
          title: '考试',
          extra: [
            <Alert
              message={this.timeFilter(this.state.remainTime)}
              type="warning"
              showIcon
            />,
          ],
        }}
      >
        {!this.state.examStatus && (
          <ProCard>
            <Descriptions
              title={this.state.paper?.paper_title}
              bordered
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="试卷名称">
                {this.state.paper?.paper_title}
              </Descriptions.Item>
              <Descriptions.Item label="卷面分值">
                {this.state.paper?.paper_score} 分
              </Descriptions.Item>
              <Descriptions.Item label="考试时长">
                {this.state.paper?.paper_time} 分钟
              </Descriptions.Item>
              <Descriptions.Item label="考察知识点" span={4}>
                {this.state.paper?.paper_points}
              </Descriptions.Item>
              <Descriptions.Item
                label="考试须知"
                span={4}
                labelStyle={{ fontWeight: 'bold', color: '#f00' }}
                contentStyle={{ fontWeight: 'bold', color: '#f00' }}
              >
                <div>1. 按下下方开始考试按钮，计时开始；</div>
                <div>2. 计时开始后，退出页面认为交卷；</div>
                <div>3. 考试时间结束，自动交卷。</div>
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              style={{ marginTop: 10 }}
              onClick={this.handleStartExam}
            >
              开始考试
            </Button>
          </ProCard>
        )}
        {this.state.examStatus && this.state.examId != undefined && (
          <>
            <Alert
              banner
              message={
                <Marquee pauseOnHover gradient={false}>
                  诚信考试；考试过程中请勿跳转页面或者关闭页面，系统对于此操作视为交卷。
                </Marquee>
              }
            />
            {this.renderAnswerSheet()}
            <Detail
              ref={this.paperDetailRef}
              type="exam"
              paperId={this.state.paper?._id}
            />
          </>
        )}
      </PageContainer>
    );
  };
}
