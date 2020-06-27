import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const MyCalendar = () => {
    const [date, setDate] = useState([new Date().getDate(), new Date(2019, 5, 9)])
    const changeDate = (date) => setDate(date)
    return(
        <div>
            <Calendar onChange={changeDate} value={date} select={'multiple'} />
        </div>
    )
}

export default MyCalendar