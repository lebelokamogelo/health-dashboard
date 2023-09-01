import { doctorProps } from "@/app/(screens)/doctors/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProfileDoctor({ data }: { data: doctorProps }) {
  return (
    <div className="max-w-xs bg-white pb-2 border border-gray-200 rounded-lg shadow">
      <Image
        className="rounded-t-lg"
        src="/doctor.png"
        alt=""
        width={500}
        height={500}
      />
      <div className="p-5">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-slate-800">
          {data.name}
        </h5>
        <p className="text-base opacity-70">{data.specializing}</p>
        <p className="my-4 text-base font-normal text-slate-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </div>
      <div className="view flex justify-center">
        <Link
          href="/doctors"
          className="px-3 py-2 w-40 text-sm text-center text-white bg-slate-700 rounded-md hover:bg-slate-800 focus:ring-4 focus:outline-none"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
