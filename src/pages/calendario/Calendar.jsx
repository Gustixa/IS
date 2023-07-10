import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import SideBar from '@components/sideBar'

const localizer = momentLocalizer(moment);

export default function Calendario() {
  return (
    <div>
      <SideBar></SideBar>
      <h1>Calendario</h1>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  )
}
