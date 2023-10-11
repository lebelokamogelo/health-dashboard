"use client"

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
import { Trash2 } from "lucide-react"
import toast from "react-hot-toast"

import { db } from "@/model/firebase"
import emailjs from "@emailjs/browser"
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore"

export default function DeleteUser({ email }: { email: String }) {
  const sendEmail = async () => {
    const emailRef = query(collection(db, "trash"), where("email", "==", email))

    const querySnapshot = await getDocs(emailRef)

    if (!querySnapshot.empty) {
      toast.error(
        "The account deletion process has been initiated, and it is scheduled to be completed in 30 days."
      )
      return
    } else {
      const docRef = await addDoc(collection(db, "trash"), {
        email: email,
      })

      if (docRef.id) {
        emailjs
          .send(
            "service_07yhmoj",
            "template_xiin8pf",
            {
              email: email,
            },
            "6iESPvcVAhcMQEsOw"
          )
          .then(
            (result) => {
              toast.success("Your account will be deleted in the next 30 days.")
            },
            (error) => {
              toast.error("Failed to delete the user")
            }
          )
      } else {
        toast.error("An error has occured!")
      }
    }
  }

  return (
    <div>
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
              onClick={() => sendEmail()}
              className="bg-red-500 hover:bg-red-400"
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
