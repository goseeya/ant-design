import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';
import TimePicker from './picker';
import moment from 'moment'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
  disabledHours = (m) => {
  const hours = this.range(0, 60);
  if (m === 21) {
    console.log('m to 15');
    // hours.splice(21, 4)
    // return hours;
  }
  else {
    console.log('else');
    hours.splice(20, 4);
    return hours;
  }

  }

  disabledMinutes = (h) => {
    if (h === 20) {
      console.log('disabled minutes 20');
      return this.range(0, 31);
    } else if (h === 23) {
      return this.range(30, 60);
    }
    return [];
  }
  handleChange(date) {
    message.info('Selected Date: ' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>Date: {this.state.date.toString()}</div>
        <p>Teraz TimePicker</p>
      <TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss')}
      disabledHours={this.disabledHours}
      disabledMinutes={this.disabledMinutes}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
