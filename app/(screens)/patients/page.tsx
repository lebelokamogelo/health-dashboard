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
import { Settings2, X } from "lucide-react"

import { auth, db } from "@/model/firebase"
import { createUserWithEmailAndPassword } from "@firebase/auth"
import { doc, setDoc } from "@firebase/firestore"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "react-hot-toast"
import { PulseLoader } from "react-spinners"

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
import { useEffect, useState } from "react"
import DeleteUser from "./DeleteUser"

type PatientProps = {
  uuid: string
  name: string
  email: string
  phone: string
}

export default function Patients() {
  const [data, setData] = useState<Array<PatientProps>>([])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("+27000000000")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingPatient, setLoadingPatient] = useState(true)

  const createAccount = (
    email: string,
    password: string,
    phone: string,
    name: string
  ) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user

        await setDoc(doc(db, "patients", user.uid), {
          name: name,
          image: "",
          email: email,
          phone: phone,
          uuid: user.uid,
        })
          .then(async () => {
            setData((prev) => [...prev, { uuid: user.uid, name, email, phone }])

            const response = await fetch("/api/account", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                username: email,
                password: password,
                phone: phone,
              }),
            })

            if (response.ok) {
              const responseData = await response.json()

              if (responseData.status === "200") {
                toast.success("Account was created successfully")
                setLoading(false)
              } else {
                toast.error("Something went wrong")
                setLoading(false)
              }
            } else {
              toast.error("Server error")
              setLoading(false)
            }
          })
          .catch((err) => {
            toast.success(err.message)
            setLoading(false)
          })
      })
      .catch((error) => {
        const errorMessage = error.message
        toast.error(errorMessage)
        setLoading(false)
      })
  }
  ;``
  useEffect(() => {
    const getPatients = async () => {
      const res = await fetch("/api/patients", {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        cache: "no-cache",
      })

      if (res.ok) {
        setData(await res.json())
        setLoadingPatient(false)
      }
    }

    getPatients()
  }, [])

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
                <div className="bg-grey-lighter flex flex-col">
                  <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded text-black w-full">
                      <h1 className="mb-8 text-xl text-center">
                        Create Account
                      </h1>
                      <input
                        type="text"
                        className="input-border text-base text-slate-800"
                        name="fullname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                      />

                      <input
                        type="text"
                        className="input-border text-base text-slate-800"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />

                      <input
                        type="text"
                        className="input-border text-base text-slate-800"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />

                      <div className="flex items-center border mb-4 border-gray-300 rounded-md p-0.5 input-password">
                        <input
                          id="Password"
                          type={show ? "text" : "password"}
                          className="flex-1 w-full h-full px-4 py-2 rounded-md focus:outline-none text-base text-slate-800"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                        <div
                          className="p-1 mx-2 rounded-md show-hide-password hover:bg-slate-200"
                          onClick={() => setShow((prev) => !prev)}
                        >
                          {show ? <Eye /> : <EyeOff />}
                        </div>
                      </div>
                      <div className="loading mt-20 flex justify-center">
                        {loading ? (
                          <PulseLoader color="#36d7b7" />
                        ) : (
                          <button
                            className="border-0 text-white text-base bg-slate-600 hover:bg-slate-700 w-full p-2.5 rounded-md outline-none"
                            onClick={() => {
                              createAccount(email, password, phone, name)
                            }}
                          >
                            Create Accout
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Dialog>

      {loadingPatient ? (
        <div className="loading w-full text-center">
          <PulseLoader color="#36d7b7" />
        </div>
      ) : (
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
            {data &&
              data.map((patient: PatientProps) => (
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
      )}
    </div>
  )
}
