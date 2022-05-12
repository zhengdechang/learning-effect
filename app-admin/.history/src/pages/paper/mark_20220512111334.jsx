import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import BaseTable from '@/components/base-table';
import graphql from '@/utils/graphql';
import Detail from './detail';
import BaseForm from '@/components/base-form';
import { connect } from 'dva';
import _ from 'lodash';
import ProCard from '@ant-design/pro-card';
import { Descriptions, message, Button, Alert, Popconfirm } from 'antd';
import { getConfig, getUser } from '@/utils/dict';

import { getQuestion } from '../../services/question';
import { getExamList } from '../../services/exam';

const mergeList = (answerList = [], questionList = []) => {
  if (_.isEmpty(answerList)) return questionList;
  let list = [];

  let res = answerList.map((item) => {
    questionList.map((i) => {
      if (item.question_id == i?._id) {
        list = [
          ...list,
          {
            ...i,
            answer_value: item.answer_value,
          },
        ];
      }
      return [...list, i];
    });
  });
  return list;
};

class AnswerSheet extends BaseForm {
  constructor(props) {
    super(props);
    _.assign(this.state, {
      formValueList: {},
      transFormValue: {},
    });
  }

  trans = (formValueList) => {
    let res = { empty_score: 0, select_score: 0, brief_score: 0 };
    Object.keys(formValueList).map((item) => {
      if (item.split('_')?.[1].includes('1')) {
        res = {
          ...res,
          select_score: res.select_score + Number(formValueList?.[item] ?? 0),
        };
      }
      if (item.split('_')?.[1].includes('2')) {
        res = {
          ...res,
          empty_score: res.empty_score + Number(formValueList?.[item] ?? 0),
        };
      }
      if (item.split('_')?.[1].includes('3')) {
        res = {
          ...res,
          brief_score: res.brief_score + Number(formValueList?.[item] ?? 0),
        };
      }
    });

    return res;
  };

  onChange = (e, key) => {
    this.setState(
      {
        formValueList: {
          ...this.state.formValueList,
          [key]: e.target.value,
        },
      },
      () => {
        this.setState({
          transFormValue: this.trans(this.state.formValueList),
        });
      },
    );
  };

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
        return !this.props.isView
          ? [
              <Popconfirm
                placement="topRight"
                title="确定要提交答题卡？"
                onConfirm={() => {
                  this.props.changeMarkStatus(false);
                  // props.form?.submit?.()
                  this.handleSubmit();
                }}
                okText="确定"
                cancelText="取消"
                key="submit"
              >
                <Button type="primary">提交</Button>
              </Popconfirm>,
            ]
          : [];
      },
    };
  };

  getKnowList = async (paperId, examId) => {
    const { questionList } = await getQuestion(paperId);

    const { data } = await getExamList({ exam_id: examId });

    let knowList = {};

    let list = JSON.parse(data?.[0]?.other);
    console.log('list: ', list, questionList);

    questionList.map((item) => {
      Object.keys(list).map((key) => {
        if (key == item._id) {
          item.know.map((i) => {
            console.log(!knowList?.[i] ? knowList?.[i] : 0, '2');
            knowList = {
              ...knowList,
              [i]:
                (!knowList?.[i] ? knowList?.[i] : 0) +
                _.divide(+list?.[key], item.know?.length),
            };
          });
        }
      });
    });

    return knowList;
  };

  handleSubmit = async () => {
    const validateValue = await this.formRef.current?.validateFields();
    let answers = this.formatValue(validateValue);

    answers = { ...answers, ...this.state.transFormValue };

    let score = _.pickBy(answers.other, (value, key) => {
      return key.includes('_');
    });

    let scoreUnique = {};

    Object.keys(score).map((item) => {
      scoreUnique = {
        ...scoreUnique,
        [item.slice(0, 24)]: score?.[item],
      };
    });

    let sum =
      Number(answers?.select_score ?? 0) +
      Number(+answers?.empty_score ?? 0) +
      +Number(answers?.brief_score ?? 0);

    const query = `mutation AddScore($id: ID, $sign: UpdateScore){
      addScore(id: $id, sign: $sign)
    }`;

    const variables = {
      id: this.props.answerList[0]?.exam_id,
      sign: {
        ...answers,
        sum_score: sum,
        other: JSON.stringify(scoreUnique),
      },
    };

    try {
      await graphql(query, variables);
      message.success('提交完成');

      let res = await this.getKnowList(this.props.paperId, this.props.examId);
      console.log('res: ', res);
    } catch (error) {}
  };

  formatValue = (obj) => {
    const { brief_score, empty_score, select_score, ...other } = obj;
    const data = {
      brief_score,
      empty_score,
      select_score,
      other,
    };

    return data;
  };

  getColumns = () => {
    let choiceColumns = _.map(
      mergeList(this.props.answerList, this.props.choiceList),
      (item, index) => {
        return {
          type: 'select',
          width: 'xs',
          name: `${item?._id}`,
          label: `选择题 ${index + 1}`,
          options: _.map(item?.question_content?.options, (option) => ({
            value: option?.option_key,
            label: option?.option_key,
          })),
          disabled: true,
          value: item?.answer_value,
        };
      },
    );

    let completionColumns = _.map(
      mergeList(this.props.answerList, this.props.completionList),
      (item, index) => ({
        type: 'text',
        width: 'lg',
        name: `${item?._id}`,
        label: `填空题 ${index + 1}`,
        placeholder: '请输入',
        value: item?.answer_value,
        disabled: true,
      }),
    );

    let shortColumns = _.map(
      mergeList(this.props.answerList, this.props.shortList),
      (item, index) => ({
        type: 'area',
        width: 'lg',
        name: `${item?._id}`,
        label: `简答题 ${index + 1}`,
        placeholder: '请输入',
        value: item?.answer_value,
        disabled: true,
      }),
    );

    let Core = JSON.parse(
      JSON.stringify(
        [
          !_.isEmpty(choiceColumns) && {
            type: 'text',
            width: 'xs',
            name: `select_score`,
            label: `选择题总分`,
            placeholder: '请输入',
            value: this.props.isView
              ? this.props.answerList[0]?.select_score
              : this.state.transFormValue?.select_score,
            disabled: this.props.isView && true,
          },
          !_.isEmpty(completionColumns) && {
            type: 'text',
            width: 'xs',
            name: `empty_score`,
            label: `填空题总分`,
            placeholder: '请输入',
            disabled: this.props.isView && true,
            value: this.props.isView
              ? this.props.answerList[0]?.empty_score
              : this.state.transFormValue?.empty_score,
          },
          !_.isEmpty(shortColumns) && {
            type: 'text',
            width: 'xs',
            name: `brief_score`,
            label: `简答题总分`,
            placeholder: '请输入',
            style: { float: 'right' },
            value: this.props.isView
              ? this.props.answerList[0]?.brief_score
              : this.state.transFormValue?.brief_score,
            disabled: this.props.isView && true,
          },
        ]?.filter((item) => !!item),
      ),
    );

    let choiceScore = _.map(
      mergeList(this.props.answerList, this.props.choiceList),
      (item, index) => {
        return {
          type: 'text',
          width: 'xs',
          name: `${item?._id}_${item.question_type}`,
          label: `选择题 ${index + 1}得分`,
          onChange: (e) => {
            this.onChange(e, `${item?._id}_${item.question_type}`);
          },
          value: this.props.answerList[0]?.other?.[`${item?._id}`],
          disabled: this.props.isView && true,
        };
      },
    );

    let completionScore = _.map(
      mergeList(this.props.answerList, this.props.completionList),
      (item, index) => ({
        type: 'text',
        width: 'xs',
        name: `${item?._id}_${item.question_type}`,
        label: `填空题 ${index + 1}得分`,
        placeholder: '请输入',
        onChange: (e) => {
          this.onChange(e, `${item?._id}_${item.question_type}`);
        },
        value: this.props.answerList[0]?.other?.[`${item?._id}`],
        disabled: this.props.isView && true,
      }),
    );

    let shortScore = _.map(
      mergeList(this.props.answerList, this.props.shortList),
      (item, index) => ({
        type: 'text',
        width: 'xs',
        name: `${item?._id}_${item.question_type}`,
        label: `简答题 ${index + 1}得分`,
        placeholder: '请输入',
        onChange: (e) => {
          this.onChange(e, `${item?._id}_${item.question_type}`);
        },
        value: this.props.answerList[0]?.other?.[`${item?._id}`],
        disabled: this.props.isView && true,
      }),
    );

    return [
      choiceColumns,
      completionColumns,
      shortColumns,
      Core,
      choiceScore,
      completionScore,
      shortScore,
    ];
  };
}

class MyTable extends BaseTable {
  modalRef = React.createRef();
  constructor(props) {
    super(props);
    this.paperId = props.paperId || props.match?.params?.paperId;

    _.assign(this.state, {
      headerTitle: '考试列表',
      rowKey: '_id',
      config: {
        search: false,
      },
    });
  }

  getColumns = () => {
    return [
      {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
      },
      {
        title: '班级',
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
      },
      {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => {
          return [
            !!!record?.sum_score && (
              <a
                onClick={() => {
                  this.props.getAnswerList(
                    record.user_id,
                    record.paper_id,
                    record?._id,
                  );
                  this.props.getExamId(record?._id);
                  this.props.changeMarkStatus(true);
                }}
              >
                评卷
              </a>
            ),
            !!record.sum_score && (
              <a
                onClick={() => {
                  this.props.getAnswerList(
                    record.user_id,
                    record.paper_id,
                    record?._id,
                  );
                  this.props.getExamId(record?._id);
                  this.props.changeMarkStatus(true, true);
                }}
              >
                预览
              </a>
            ),
          ];
        },
      },
    ];
  };

  getData = async (params = {}) => {
    const { current, pageSize, ...filters } = params;
    const query = `
      query ExamList($filters: Filters){
        examList(filters: $filters){
          data{
            _id
            paper_id
            user_id
            start_time
            end_time
            select_score
            empty_score
            brief_score
            sum_score
            user{
              name
              user_type
              phone
              created_at
              classes_id
              class{
              classes_name
            }
            }
            paper{
              paper_status
              paper_title
              paper_type
              created_at
              paper_points
              paper_time
              paper_score
              pass_at
            }
            
          }
          total
        }
      }
    `;

    const variables = {
      filters: {
        paper_id: this.paperId,
      },
    };
    const res = await graphql(query, variables);
    let { total, data } = res?.examList;

    data = data?.map((item, index) => {
      let { user, paper, ...i } = item;
      return {
        key: index,
        ...i,
        ...user?.[0],
        ...paper?.[0],
        ...user?.[0]?.class[0],
      };
    });

    return {
      total,
      data,
      status: 'success',
    };
  };

  // componentDidMount = () => {
  //   this.getData({ current: 1, pageSize: 5 });
  // };

  toolBarRender = () => {};
}

@connect((state) => ({
  choiceList: state.paper.choiceList,
  completionList: state.paper.completionList,
  shortList: state.paper.shortList,
}))
export default class Component extends React.PureComponent {
  paperDetailRef = React.createRef();
  answerSheetRef = React.createRef();
  myTable = React.createRef();
  // this.myTable?.current?.props
  constructor(props) {
    super(props);
    this.paperId = props.paperId || props.match?.params?.paperId;
    this.state = {
      markStatue: false,
      answerList: [],
      type: 'mark',
      isView: false,
      examId: '',
    };
  }

  // componentDidMount() {
  //   this.getAnswerList();
  // }

  getExamId = (id) => {
    this.setState({
      examId: id,
    });
  };

  renderAnswerSheet = () => {
    // 答题卡
    return (
      <ProCard style={{ marginBottom: 20 }}>
        <h1>答题卡（试卷在答题卡下方,在答题卡下方批改试卷）</h1>
        <AnswerSheet
          ref={this.answerSheetRef}
          choiceList={this.props.choiceList}
          completionList={this.props.completionList}
          shortList={this.props.shortList}
          examId={this.state.examId}
          isView={this.state.isView}
          paperId={this.paperId}
          changeMarkStatus={(markStatus) => this.changeMarkStatus(markStatus)}
          answerList={this.state.answerList}
        />
      </ProCard>
    );
  };

  changeMarkStatus = (markStatue, isView) => {
    this.setState({
      markStatue: markStatue,
      isView: isView,
    });
  };

  getData = async (examId) => {
    const query = `
      query ExamList($filters: Filters){
        examList(filters: $filters){
          data{
            _id
            paper_id
            user_id
            start_time
            end_time
            select_score
            empty_score
            brief_score
            sum_score
            other
            user{
              name
              user_type
              phone
              created_at
              classes_id
              class{
              classes_name
            }
            }
            paper{
              paper_status
              paper_title
              paper_type
              created_at
              paper_points
              paper_time
              paper_score
              pass_at
            }
            
          }
          total
        }
      }
    `;

    const variables = {
      filters: {
        paper_id: this.paperId,
      },
    };
    const res = await graphql(query, variables);
    let { total, data } = res?.examList;
    data = data?.filter((item) => item?._id == examId)?.[0];
    return data;
  };

  transOther = (other) => {
    if (_.isEmpty(other)) return;

    let res = JSON.parse(other);
    let result = {};
    Object.keys(res).map((item) => {
      result = {
        ...result,
        [item]: res?.[item],
      };
    });

    return result;
  };

  getAnswerList = async (id, pid, exam_id) => {
    const query = `query AnswerList($filters: Filters) {
        answerList(filters: $filters){
         data{
            _id
          paper_id
          question_id{
            _id
            paper_id
            question_type
            question_content
            question_score
            question_value

          }
          question_type
          answer_value
          user_id
          exam_id
         }
         total
        }
      }`;
    const variables = {
      filters: {
        paper_id: pid,
        user_id: id,
        exam_id: exam_id,
      },
    };

    let res;

    try {
      res = await graphql(query, variables);

      let examId = res?.answerList.data?.[0]?.exam_id;
      const data = await this.getData(examId);

      res = res?.answerList.data?.map((item) => {
        const { question_id, ...i } = item;
        return {
          ...i,
          ...question_id,
          question_id: question_id?._id,
          sum_score: data?.sum_score,
          brief_score: data?.brief_score,
          select_score: data?.select_score,
          empty_score: data?.empty_score,
          other: this.transOther(data.other),
        };
      });

      this.setState({
        answerList: res,
      });
    } catch (error) {}

    // const questionList = _.get(res, 'questionList');
    // this.formQuestionList(questionList);
  };

  render = () => {
    return (
      <PageContainer
        header={{
          title: '评阅试卷',
        }}
      >
        {!this.state.markStatue && (
          <MyTable
            paperId={this.paperId}
            ref={this.myTable}
            getExamId={this.getExamId}
            changeMarkStatus={(markStatus, isView) =>
              this.changeMarkStatus(markStatus, isView)
            }
            getAnswerList={this.getAnswerList}
            answerList={this.state.answerList}
          />
        )}
        {this.state.markStatue && this.renderAnswerSheet()}
        {this.state.markStatue && (
          <Detail
            type="mark"
            ref={this.paperDetailRef}
            paperId={this.paperId}
          />
        )}
      </PageContainer>
    );
  };
}
