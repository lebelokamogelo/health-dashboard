"use client"
import { Button } from "@/components/ui/button"
import { db } from "@/model/firebase"
import { addDoc, collection, getDocs } from "@firebase/firestore"
import addHours from "date-fns/addHours"
import format from "date-fns/format"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import { useEffect, useState } from "react"
import { Calendar, dateFnsLocalizer, stringOrDate } from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import toast from "react-hot-toast"

type Events = {
  title: string
  start: Date
  end: Date
}

export default function CalendarEvents() {
  const [events, setEvents] = useState<Events[]>([])
  const [newEvent, setNewEvent] = useState<Events>({
    title: "",
    start: new Date(),
    end: addHours(new Date(), 1),
  })

  useEffect(() => {
    const getEventsFirebase = async () => {
      const querySnapshot = await getDocs(collection(db, "events"))

      const data: Array<Events> = []

      querySnapshot.forEach((doc) => {
        data.push({
          title: doc.data().title,
          start: new Date(doc.data().start),
          end: new Date(doc.data().end),
        })
      })

      setEvents(data)
    }

    getEventsFirebase()
  }, [events])

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

  const handleAddEvent = async () => {
    await addDoc(collection(db, "events"), {
      title: newEvent.title,
      start: newEvent.start.toString(),
      end: newEvent.end.toString(),
    })
      .then(() => {
        setEvents([...events, newEvent])
      })
      .catch(() => {
        toast.error("An error occured, Try again ")
      })
      .finally(() => {
        setNewEvent({
          title: "",
          start: new Date(),
          end: addHours(new Date(), 1),
        })
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
