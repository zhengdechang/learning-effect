import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import BaseTable from '@/components/base-table';
import graphql from '@/utils/graphql';
// import Detail from './detail';

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
        render: (text, record, _, action) => [<a>评阅</a>],
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
            score
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
    const { total, data } = res;
    data = data.map((item) => {
      let { user, paper, ...i } = item;
      return {
        ...i,
        ...user?.[0],
        ...paper?.[0],
        ...user?.[0]?.class[0],
      };
    });
    console.log(data);
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

export default class Component extends React.PureComponent {
  paperDetailRef = React.createRef();

  constructor(props) {
    super(props);
    this.paperId = props.paperId || props.match?.params?.paperId;
    this.state = {};
  }

  render = () => {
    return (
      <PageContainer
        header={{
          title: '评阅试卷',
        }}
      >
        <MyTable paperId={this.paperId} />

        {/* <Detail
              type="view"
              ref={this.paperDetailRef}
              paperId={this.paperId} /> */}
      </PageContainer>
    );
  };
}
