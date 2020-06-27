import React, { Component } from 'react';
import Calendar from 'react-calendar';
const date = new Date()
 
export default class ClassCalendar extends Component {
  state = {
    date: new Date(),
    highliged: [date.getDate()-5, date.getDate()]
  }
 
  onChange = date => this.setState({ date })


 
  render() {
      console.log(this.state.date)
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          activeStartDate={date.getDate-5}
          defaultValue={this.state.highlighted}
        //   onClickDay={}
        />
        <button></button>
      </div>
    );
  }
}