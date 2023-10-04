"use client"
import { useState } from "react"
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  stringOrDate,
} from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"
import addHours from "date-fns/addHours"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Button } from "@/components/ui/button"

export default function CalendarEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: new Date(),
    end: addHours(new Date(), 1),
  })

  const handleSelect = (slotInfo: {
    start: stringOrDate
    end: stringOrDate
  }) => {
    setNewEvent({
      title: "New Event",
      start: new Date(slotInfo.start),
      end: new Date(slotInfo.end),
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    })
  }

  const handleAddEvent = () => {
    setEvents([...events, newEvent])
    setNewEvent({
      title: "",
      start: new Date(),
      end: addHours(new Date(), 1),
    })
  }

  return (
    <div className="space-y-2 text-center">
      <div className="flex space-x-4 items-center">
        <input
          value={newEvent.title?.toString()}
          onChange={(e) => handleInputChange(e)}
          type="text"
          className="px-4 py-2 h-10 text-base rounded-md bg-transparent border-[1px] border-slate-200 w-[520px] outline-none"
        />
        <Button
          className="bg-slate-700 h-10 text-sm hover:bg-slate-800"
          onClick={handleAddEvent}
        >
          Add Event
        </Button>
      </div>
      <DnDCalendar
        className="text-base"
        defaultView={"month"}
        views={["month"]}
        events={events}
        localizer={localizer}
        resizable
        selectable
        onSelectSlot={handleSelect}
        style={{ height: 700 }}
      />
    </div>
  )
}

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const DnDCalendar = withDragAndDrop(Calendar)
