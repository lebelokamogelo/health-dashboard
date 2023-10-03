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

import emailjs from "@emailjs/browser"
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "@firebase/firestore"
import { db } from "@/model/firebase"

export default function DeleteUser({ email }: { email: String }) {
  const sendEmail = async () => {
    const emailRef = query(collection(db, "trash"), where("email", "==", email))

    const querySnapshot = await getDocs(emailRef)

    if (!querySnapshot.empty) {
      toast.success("Already deleted")
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
              email: "lebelokamogelo47@gmail.com",
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
        toast.error("Failed to delete the user")
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
