"use client"
import { Button } from "@/components/ui/button"
import { deleteUser, getAuth, updatePassword } from "@firebase/auth"
import { collection, getDocs } from "@firebase/firestore"
import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { PulseLoader } from "react-spinners"

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
import { useRouter } from "next/navigation"
import { db } from "@/model/firebase"

export default function Account() {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const router = useRouter()

  const auth = getAuth()

  const user = auth.currentUser

  const updateProfile = async () => {
    setLoading(true)
    await updatePassword(user!, password)
      .then(() => {
        toast.success("Saved successfully")
        setLoading(false)
      })
      .catch((error) => {
        toast.error(error)
        setLoading(false)
      })
  }

  return (
    <div>
      <p className="text-xl">Account Settings</p>
      <div className="flex items-center space-x-8">
        <div className="information mt-8 space-y-6">
          <div className="username flex flex-col space-y-4">
            <label className="text-lg text-slate-800">Username</label>
            <input
              type="text"
              className="px-4 text-base py-2 rounded-md bg-transparent border-[1px] border-slate-200 w-[520px] outline-none"
              value="support"
              disabled
            />
          </div>

          <div className="username flex flex-col space-y-4">
            <label className="text-lg text-slate-800">Email Address</label>
            <input
              type="text"
              className="px-4 py-2 text-base rounded-md bg-transparent border-[1px] border-slate-200 w-[520px] outline-none"
              value="support@mail.com"
              disabled
            />
          </div>

          <div className="password flex flex-col space-y-4">
            <label className="text-lg text-slate-800">Password</label>

            <div className="flex items-center border-gray-300 border-[1px] rounded-md input-password">
              <input
                id="Password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-4 py-2 rounded-md bg-transparent outline-none"
              />
              <div
                className="p-1 mx-2 rounded-md show-hide-password hover:bg-slate-200"
                onClick={() => setShow((prev) => !prev)}
              >
                {show ? <Eye /> : <EyeOff />}
              </div>
            </div>
          </div>

          <div className="button h-14">
            {loading ? (
              <div className="loading w-full text-center">
                <PulseLoader color="#36d7b7" />
              </div>
            ) : (
              <Button
                onClick={() => updateProfile()}
                className="text-base bg-slate-700 hover:bg-slate-800"
              >
                Save changes
              </Button>
            )}
          </div>
        </div>

        <div className="requirements bg-slate-200 py-4 px-8 rounded-sm">
          <p>Password requirements</p>
          <ul className="text-sm mt-3">
            <li>At least 8 characters</li>
            <li>At least one uppercase</li>
            <li>At least one number</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
