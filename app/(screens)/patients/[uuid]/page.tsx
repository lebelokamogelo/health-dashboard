"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { auth, db } from "@/model/firebase"
import { sendPasswordResetEmail } from "@firebase/auth"
import { doc, getDoc, updateDoc } from "@firebase/firestore"
import { MoveLeft } from "lucide-react"
import React, { use, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { PuffLoader, PulseLoader } from "react-spinners"
import { useRouter } from "next/navigation"

export default function Patient({ params }: { params: { uuid: String } }) {
  const uuid = params.uuid.toString()
  const [patient, setPatient] = useState({
    phone: "",
    name: "",
    email: "",
    uuid: "",
  })

  const [updating, setUpdating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const getPatientByUID = async () => {
      const docRef = doc(db, "patients", uuid)

      const patient = await getDoc(docRef)

      setPatient({
        phone: patient.data()?.phone,
        name: patient.data()?.name,
        email: patient.data()?.email,
        uuid: uuid,
      })

      setFetching(false)
    }

    getPatientByUID()
  }, [uuid])

  const avatarFallBackName = (name: string) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")

  const ResetPassword = async () => {
    setLoading(true)
    await sendPasswordResetEmail(auth, "patient.email")
      .then(() => {
        toast.success(
          "You should receive an email with a link to reset your password"
        )
        setLoading(false)
      })
      .catch((error) => {
        const errorMessage = error.message
        toast.error(errorMessage)
        setLoading(false)
      })
  }

  const updateProfile = async () => {
    setUpdating(true)
    const userRef = doc(db, "patients", uuid)

    try {
      await updateDoc(userRef, {
        name: patient.name,
        phone: patient.phone,
      })
      toast.success("Profile updated")
      setUpdating(false)
    } catch (error) {
      toast.error("An error has occured")
      setUpdating(false)
    }
  }

  return (
    <div className="max-w-[1240px] mx-auto">
      <div className="back w-10 cursor-pointer" onClick={() => router.back()}>
        <MoveLeft />
      </div>
      <p className="mt-4">Patient Information</p>

      <div className="information mt-8 ">
        <div className="image bg-white p-6 rounded-md">
          <div className="avatar flex items-center space-x-3 h-14 mt-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>{avatarFallBackName("Support")}</AvatarFallback>
            </Avatar>
            {fetching ? (
              <PuffLoader color="#36d7b7" />
            ) : (
              <div>
                <p className="text-base">{patient.name}</p>
                <p className="text-base text-blue-600 underline">
                  {patient.email}
                </p>
              </div>
            )}
          </div>

          <div className="line mt-8 w-full h-[1px] bg-slate-300"></div>

          <div className="name flex flex-col space-y-2 mt-8">
            <label className="text-base text-slate-800 opacity-80">
              Full names
            </label>
            <input
              type="text"
              value={patient.name}
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
              className="px-4 py-2 rounded-md bg-transparent text-base border-[1px] border-slate-200 w-[520px] outline-none"
            />
          </div>
        </div>

        <div className="contact mt-4 bg-white p-6 rounded-md">
          <p className="text-lg">Contact Information</p>
          <div className="flex space-x-8">
            <div className="name flex flex-col space-y-2 mt-8">
              <label className="text-base text-slate-800 opacity-80">
                Contact Phone
              </label>
              <input
                type="text"
                value={patient.phone}
                onChange={(e) =>
                  setPatient({ ...patient, phone: e.target.value })
                }
                className="px-4 py-2 rounded-md bg-transparent text-base border-[1px] border-slate-200 w-[520px] outline-none"
              />
            </div>
            <div className="email flex flex-col space-y-2 mt-8">
              <label className="text-base text-slate-800 opacity-80">
                Email Address
              </label>
              <input
                type="text"
                value={patient.email}
                disabled
                className="px-4 py-2 rounded-md bg-transparent text-base border-[1px] border-slate-200 w-[520px] outline-none"
              />
            </div>
          </div>
          <p className="text-lg mt-8">Security</p>
          <div className="password mt-4">
            {loading ? (
              <div className="loading">
                <PulseLoader color="#36d7b7" />
              </div>
            ) : (
              <p
                onClick={() => ResetPassword()}
                className="text-base underline text-slate-700 cursor-pointer hover:text-blue-600"
              >
                Reset password
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="button mt-8 mx-4">
        {updating ? (
          <PulseLoader color="#36d7b7" />
        ) : (
          <Button
            onClick={() => updateProfile()}
            className="bg-slate-700 text-base hover:bg-slate-800"
          >
            Update profile
          </Button>
        )}
      </div>
    </div>
  )
}
