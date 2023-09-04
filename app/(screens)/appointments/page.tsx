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
import { collectionGroup, getDocs } from "@firebase/firestore";
import { Settings2, Trash2, X } from "lucide-react";
import { uuid } from "uuidv4";

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
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Account from "@/components/account/Account";

type apppointmentProps = {
  time: string;
  place?: string;
  date: string;
  uuid?: string;
  doctorId?: string;
  status: string;
  id: string;
  name: string;
};

export default async function Appoitments() {
  const querySnapshot = await getDocs(collectionGroup(db, "appointment"));
  console.log(querySnapshot);

  const data: Array<apppointmentProps> = [];

  querySnapshot.forEach((doc) => {
    data.push({
      time: doc.data().time,
      date: doc.data().date,
      status: doc.data().status,
      id: doc.data().id,
      name: doc.data().name,
    });
  });

  const avatarFallBackName = (name: string) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");

  return (
    <div className="table w-full h-full relative">
      <Table className="border mt-10">
        <TableCaption className="text-slate-500 text-base">
          Appointments
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
          {data.map((appointment, index) => (
            <TableRow key={uuid()}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{appointment.name}</TableCell>
              <TableCell>{appointment.date}</TableCell>

              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <p
                  className={`bg-slate-200 opacity-80 p-1 text-center rounded-full w-24 text-white ${
                    appointment.status == "Pending"
                      ? "bg-slate-500 font-semibold text-slate-50"
                      : "bg-teal-500 font-semibold"
                  }`}
                >
                  {appointment.status}
                </p>
              </TableCell>
              <TableCell>
                <div className="action flex space-x-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Settings2 className="bg-teal-400 text-neutral-200 cursor-pointer p-1.5 rounded-lg h-8 w-8" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-slate-800 text-base">
                          Are you sure you want to delete?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-teal-400 hover:bg-teal-500">
                          Saved
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

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
                        <AlertDialogAction className="bg-red-500 hover:bg-red-400">
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
  );
}
