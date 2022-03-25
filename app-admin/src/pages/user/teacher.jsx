import User from './user';
import _ from 'lodash';

export default class Component extends User{
  constructor(props){
    super(props);
    _.assign(this.state, {
      headerTitle: "教师列表",
      rowKey: '_id',
    });
  }

  setUserType = (config) => {
    this.setState({
      userType: config?.user_type?.teacher,
    });
  }
}
