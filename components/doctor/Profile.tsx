"use client";

import { doctorProps } from "@/app/(screens)/doctors/page";
import Image from "next/image";
import React from "react";
import ReactStars from "react-rating-star-with-type";

export default function ProfileDoctor({ data }: { data: doctorProps }) {
  return (
    <div className="flex items-center bg-white p-2 border hover:bg-slate-50 border-gray-200 rounded-lg shadow-sm">
      <Image
        className="rounded-2xl p-2 h-[84px] w-[88px] bg-slate-100"
        src="/doctor.png"
        alt=""
        width={500}
        height={200}
      />
      <div className="p-5">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-slate-800">
          {data.name}
        </h5>
        <p className="text-base opacity-70">{data.specializing}</p>

        <div className="footer flex mt-4">
          <ReactStars value={parseInt(data.rating!)} isEdit={false} />
        </div>
      </div>
    </div>
  );
}
