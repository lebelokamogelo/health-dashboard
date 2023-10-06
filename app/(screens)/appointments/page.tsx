"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/model/firebase"
import {
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "@firebase/firestore"
import { ChevronDown, Trash2, X } from "lucide-react"
import { nanoid } from "nanoid"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { PulseLoader } from "react-spinners"
import CreateAppointment from "./CreateAppointment"

export type apppointmentProps = {
  time: string
  place?: string
  date: string
  uuid: string
  doctorId?: string
  status: string
  id: string
  name: string
}

export default function Appoitments() {
  const [appointments, setAppointments] = useState<Array<apppointmentProps>>([])
  const [change, setChange] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collectionGroup(db, "appointment"))

      const data: Array<apppointmentProps> = []

      querySnapshot.forEach((doc) => {
        data.push({
          time: doc.data().time,
          date: doc.data().date,
          status: doc.data().status,
          id: doc.data().id,
          name: doc.data().name,
          uuid: doc.data().uuid,
        })
      })

      setAppointments(data)
      setLoading(false)
    }

    getData()
  }, [change])

  const updateAppointment = async (
    uuid: string,
    appointmentId: string,
    status: string
  ) => {
    const appointmentRef = doc(
      db,
      "appointments",
      uuid,
      "appointment",
      appointmentId
    )

    // Update the status field using updateDoc
    try {
      await updateDoc(appointmentRef, {
        status: status,
      })
      toast.success("Appointment updated successfully")
    } catch (error) {
      toast.error("An error has occured")
    }
  }

  const deleteAppointment = async (uuid: string, appointmentId: string) => {
    const appointmentRef = doc(
      db,
      "appointments",
      uuid,
      "appointment",
      appointmentId
    )

    try {
      await deleteDoc(appointmentRef)
      toast.success("Appointment deleted successfully")
    } catch (error) {
      toast.error("An error has occured")
    }
  }

  return (
    <div className="table w-full h-full relative">
      <Dialog>
        <DialogTrigger asChild></DialogTrigger>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <p className="cursor-pointer bg-slate-200 hover:bg-slate-300 text-base w-52 text-center p-2 rounded-md">
              Create appointment
            </p>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogCancel className="absolute right-0 h-14 w-14 border-none rounded-full">
              <X />
            </AlertDialogCancel>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <CreateAppointment />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Dialog>

      {loading ? (
        <div className="loading w-full text-center">
          <PulseLoader color="#36d7b7" />
        </div>
      ) : (
        <Table className="border mt-10">
          <TableCaption className="text-slate-500 text-base">
            {appointments.length ? "Appointments" : "No Appointments"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={nanoid()}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {appointment.name}
                </TableCell>
                <TableCell>{appointment.date}</TableCell>

                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <div
                    className={`opacity-80 p-1 text-center rounded-full w-32`}
                  >
                    {appointment.uuid ==
                    "cc7d3055-0911-483a-b836-a9a84454b7b6" ? (
                      <span className="flex items-center text-base">
                        {appointment.status}
                      </span>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="text-lg tex-slate-800">
                            <span className="flex items-center text-base">
                              {appointment.status}
                              <ChevronDown className="h-4 w-4 mt-1 ml-1" />
                            </span>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 ph-2 py-4">
                          <DropdownMenuRadioGroup
                            value={appointment.status}
                            onValueChange={setChange}
                          >
                            <DropdownMenuRadioItem
                              value="Pending"
                              onClick={() => {
                                updateAppointment(
                                  appointment.uuid,
                                  appointment.id,
                                  "Pending"
                                )
                              }}
                            >
                              Pending
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value="Approved"
                              onClick={() => {
                                updateAppointment(
                                  appointment.uuid,
                                  appointment.id,
                                  "Approved"
                                )
                              }}
                            >
                              Approved
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="action">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash2 className="bg-red-400 text-neutral-200 cursor-pointer p-2 rounded-lg h-8 w-8" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-slate-800 text-base">
                            Are you sure you want to delete?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-400"
                            onClick={() => {
                              deleteAppointment(
                                appointment.uuid,
                                appointment.id
                              )
                              setChange("Deleted")
                            }}
                          >
                            Yes
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
