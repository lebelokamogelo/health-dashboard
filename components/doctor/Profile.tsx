"use client"

import { doctorProps } from "@/app/(screens)/doctors/page"
import Image from "next/image"
import React from "react"
import ReactStars from "react-rating-star-with-type"

export default function ProfileDoctor({ data }: { data: doctorProps }) {
  return (
    <div className="flex relative flex-col items-center bg-white p-2 border hover:bg-slate-50 border-gray-200 rounded-lg shadow-sm">
      <Image className="" src="/doctor.png" alt="" width={200} height={200} />
    </div>
  )
}
{
  /* <ReactStars value={parseInt(data.rating!)} isEdit={false} /> */
}
