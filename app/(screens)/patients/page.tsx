"use client";

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
import { useEffect, useState } from "react";
import { uuid } from "uuidv4";

type patientProps = {
  uuid: string;
  name: string;
  email: string;
  phone: string;
};

export default function Patients() {
  const [patients, setPatients] = useState<patientProps[]>([]);

  useEffect(() => {
    const getPatients = async () => {
      const querySnapshot = await getDocs(collection(db, "patients"));
      querySnapshot.forEach((doc) => {
        setPatients((prev) => [
          ...prev,
          {
            uuid: doc.data().uuid,
            name: doc.data().name,
            email: doc.data().email,
            phone: doc.data().phone,
          },
        ]);
      });
    };

    getPatients();
  }, []);

  return (
    <div className="table w-full">
      <Table className="border">
        <TableCaption className="text-slate-500 text-base">
          Patients.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email address</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={uuid()}>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>
                <p className="bg-teal-200 p-1 text-center rounded-full text-slate-800 w-24">
                  Approved
                </p>
              </TableCell>
              <TableCell>{patient.uuid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
