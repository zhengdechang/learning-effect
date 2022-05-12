import React from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';
import styles from './index.less';

export default class App extends React.Component {
  state = {
    value: moment('2017-01-25'),
    selectedValue: moment('2017-01-25'),
  };

  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    });
  };

  onPanelChange = value => {
    this.setState({ value });
  };

  render() {
    const { value, selectedValue } = this.state;
    return (
      <div className={styles.sign}>
        <div className={styles.left}>
          <Alert
            message={`您选择的日期是: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
          />
          <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
        </div>
        <div className={styles.right}>
          <div className={styles.btn}>签到</div>
          <div className={styles.btn}>签退</div>
        </div>
      </div>
    );
  }
}
