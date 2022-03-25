import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Detail from './detail';

export default class Component extends React.PureComponent{
    paperDetailRef = React.createRef();

    constructor(props){
        super(props);
        this.paperId = props.paperId || props.match?.params?.paperId;
        this.state = {};
    }

    render = () => {
        return (<PageContainer
            header={{
              title: '查看成绩',
            }}
          >
            <Detail
              type="view"
              ref={this.paperDetailRef}
              paperId={this.paperId} />
          </PageContainer>);
    }
}