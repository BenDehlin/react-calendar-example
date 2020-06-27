import React, { Component } from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"

export default class DayPick extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDays: [],
    }
  }

  handleDayClick = (day, { selected }) => {
    console.log(selected)
    const { selectedDays } = this.state
    if (selected) {
      const selectedIndex = selectedDays.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      )
      selectedDays.splice(selectedIndex, 1)
    } else {
      selectedDays.push(day)
    }
    this.setState({ selectedDays })
  }

  logOptions = () => {
    console.log(this.state.selectedDays)
  }

  render() {
    return (
      <div>
        <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
        />
        <button onClick={this.logOptions}>Log options</button>
      </div>
    )
  }
}
