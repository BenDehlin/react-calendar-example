import React, { useState, useEffect } from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import axios from "axios"
import dateFnsFormat from "date-fns/format"
import dateFnsParse from "date-fns/parse"

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, new Date(), { locale })
  if (DateUtils.isDate(parsed)) {
    return parsed
  }
  return undefined
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale })
}

const FORMAT = "MM/dd/yyyy"

export const DayPickHook = () => {
  const [selectedDays, setSelectedDays] = useState([])
  useEffect(() => {
    axios
      .get("/api/dates")
      .then((results) => {
        // setSelectedDays(parseDate(results.data, FORMAT))
        setSelectedDays(results.data.map(e => parseDate(e, FORMAT)))
      })
      .catch((err) => console.log(err))
  }, [])
  const clickDay = (day, { selected }) => {
    const days = [...selectedDays]
    if (selected) {
      const index = days.findIndex((e) => DateUtils.isSameDay(e, day))
      days.splice(index, 1)
    } else {
      days.push(day)
    }
    setSelectedDays(days)
  }
  const saveDates = () => {
    axios
      .post("/api/dates", { selectedDays })
      .then((results) => {
        setSelectedDays(results.data.map(e => parseDate(e, FORMAT)))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <DayPicker
        selectedDays={selectedDays}
        onDayClick={clickDay}
        parseDate={parseDate}
        format={FORMAT}
        formatDate={formatDate}
      />
      <button onClick={saveDates}>Save Dates</button>
    </div>
  )
}
