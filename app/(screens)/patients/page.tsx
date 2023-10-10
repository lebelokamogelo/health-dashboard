import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Settings2, X } from "lucide-react"

import Account from "@/components/account/Account"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { nanoid } from "nanoid"
import Link from "next/link"
import DeleteUser from "./DeleteUser"

type Props = {
  uuid: string
  name: string
  email: string
  phone: string
}

export default async function Patients() {
  let data = []

  const res = await fetch("http://localhost:3000/api/patients", {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    cache: "no-cache",
  })

  if (res.ok) {
    data = await res.json()
  }

  const avatarFallBackName = (name: string) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")

  return (
    <div className="table w-full h-full relative">
      <Dialog>
        <DialogTrigger asChild></DialogTrigger>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <p className="cursor-pointer bg-slate-200 hover:bg-slate-300 text-base w-28 text-center p-2 rounded-md">
              Add Patient
            </p>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogCancel className="absolute right-0 h-14 w-14 border-none rounded-full">
              <X />
            </AlertDialogCancel>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <Account />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Dialog>

      <Table className="border mt-10">
        <TableCaption className="text-slate-500 text-base">
          Patients
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Email address</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead>status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((patient: Props) => (
            <TableRow key={nanoid()}>
              <TableCell>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    {avatarFallBackName(patient.name)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>{patient.uuid}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>
                <span className="text-blue-600 text-base">Active</span>
              </TableCell>
              <TableCell className="flex space-x-4">
                <DeleteUser email={patient.email} />
                <Link href={`/patients/${patient.uuid}`}>
                  <Settings2 className="bg-teal-400 text-neutral-200 cursor-pointer p-1.5 rounded-lg h-8 w-8" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
