'use client'

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import { useState } from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { calendarEvents } from '../../public/data/data'

const localizer = momentLocalizer(moment)

const BigCalendar = () => {

  const [view, setView] = useState<View>(Views.WORK_WEEK);
  // switch view(work week, day)
  const onClickViewChange = (v: View) => setView(v);
  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={onClickViewChange}
      min={new Date(2025, 2, 12, 8, 0, 0)}
      max={new Date(2025, 2, 12, 18, 0, 0)}
    />
  )
};

export default BigCalendar;