"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/model/firebase";
import { collection, getDocs } from "@firebase/firestore";
import { Trash2, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Account from "@/components/account/Account";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { v4 } from "uuid";
import { toast } from "react-hot-toast";

type patientProps = {
  uuid: string;
  name: string;
  email: string;
  phone: string;
};

export default async function Patients() {
  const querySnapshot = await getDocs(collection(db, "patients"));

  const data: Array<patientProps> = [];

  querySnapshot.forEach((doc) => {
    data.push({
      uuid: doc.data().uuid,
      name: doc.data().name,
      email: doc.data().email,
      phone: doc.data().phone,
    });
  });

  const avatarFallBackName = (name: string) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");

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
            <TableHead>Email address</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((patient) => (
            <TableRow key={v4()}>
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
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>
                <p className="bg-teal-400 p-1 text-center font-bold rounded-full text-white w-24">
                  Approved
                </p>
              </TableCell>
              <TableCell>
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
                          toast.success(
                            "Your account will be deleted in the next 30 days."
                          );
                        }}
                      >
                        Yes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
