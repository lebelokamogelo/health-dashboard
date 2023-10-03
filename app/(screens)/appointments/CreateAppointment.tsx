"use client"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Listbox } from "@headlessui/react"

export default function CreateAppointment() {
  const [date, setDate] = useState<Date | undefined>(() => {
    const newDate = new Date(new Date().setDate(new Date().getDate() + 4))
    return newDate
  })
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. P Susan")
  const [selectedSlot, setSelectedSlot] = useState("07:30")

  const [appointment, setAppointment] = useState({
    name: "support",
    contact: "+27721789611",
  })

  const doctors = ["Dr. A Deborah", "Dr. S Freddie", "Dr. P Susan"]
  const slots = ["07:30", "10:00", "14:00"]

  const BookAppointment = () => {
    console.log(appointment, selectedDoctor, selectedSlot, date)
  }
  return (
    <div>
      <p className="text-slate-700">Request Appointment</p>

      <div className="form">
        <div className="flex space-x-4 mt-8">
          <div className="name flex flex-col space-y-2">
            <label className="text-base text-slate-800 opacity-80">
              Full names
            </label>
            <input
              type="text"
              value={appointment.name}
              onChange={(e) =>
                setAppointment({ ...appointment, name: e.target.value })
              }
              className="px-4 py-2 rounded-md bg-transparent border-[1px] border-slate-200 w-[230px] text-sm outline-none"
            />
          </div>
          <div className="phone flex flex-col space-y-2">
            <label className="text-base text-slate-800 opacity-80">
              Contact
            </label>
            <input
              type="text"
              value={appointment.contact}
              onChange={(e) =>
                setAppointment({ ...appointment, contact: e.target.value })
              }
              className="px-4 py-2 rounded-md bg-transparent border-[1px] border-slate-200 w-[230px] text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="doctor flex flex-col space-y-2 mt-3 relative">
            <label className="text-base text-slate-800 opacity-80">
              Doctor
            </label>

            <Listbox value={selectedDoctor} onChange={setSelectedDoctor}>
              <Listbox.Button className="w-[230px] text-start border-[1px] h-12 rounded-md px-2 text-sm">
                {selectedDoctor}
              </Listbox.Button>
              <Listbox.Options className="absolute bg-white bottom-0 shadow-xl text-sm space-y-3 px-4 py-2 w-40">
                {doctors.map((doctor) => (
                  <Listbox.Option
                    key={doctor}
                    value={doctor}
                    className="cursor-pointer"
                  >
                    {doctor}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          <div className="Slots flex flex-col space-y-2 mt-3 relative">
            <label className="text-base text-slate-800 opacity-80">Slots</label>
            <Listbox value={selectedSlot} onChange={setSelectedSlot}>
              <Listbox.Button className="w-[230px] text-start border-[1px] h-12 rounded-md px-2 text-sm">
                {selectedSlot}
              </Listbox.Button>
              <Listbox.Options className="absolute bg-white  shadow-xl text-sm space-y-3 px-4 py-2 w-32 bottom-0">
                {slots.map((slot) => (
                  <Listbox.Option
                    key={slot}
                    value={slot}
                    className="cursor-pointer"
                  >
                    {slot}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) =>
            date.getTime() < new Date().setDate(new Date().getDate() + 3)
          }
          initialFocus
        />
      </div>

      <div className="button mt-8 mx-4">
        <Button
          onClick={() => BookAppointment()}
          className="bg-slate-700 w-full text-base hover:bg-slate-800"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  )
}
