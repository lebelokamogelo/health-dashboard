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
import { uuid } from "uuidv4"

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

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
      console.log("Status updated successfully")
    } catch (error) {
      console.error("Error updating status:", error)
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
      console.log("Appointment deleted successfully")
    } catch (error) {
      console.error("Error deleting appointment:", error)
    }
  }

  return (
    <div className="table w-full h-full relative">
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
            <TableRow key={uuid()}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{appointment.name}</TableCell>
              <TableCell>{appointment.date}</TableCell>

              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <p className={`opacity-80 p-1 text-center rounded-full w-32`}>
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
                </p>
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
                            deleteAppointment(appointment.uuid, appointment.id)
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
    </div>
  )
}
