"use client"

import { Props } from "@/app/(screens)/doctors/page"
import Image from "next/image"
import ReactStars from "react-rating-star-with-type"

export default function ProfileDoctor({ data }: { data: Props }) {
  return (
    <div className="flex relative flex-col items-center bg-white p-2 border hover:bg-slate-50 border-gray-200 rounded-lg shadow-sm">
      <Image className="" src="/doctor.png" alt="" width={200} height={200} />
      <div className="name mt-4">
        <p className="text-slate-800">{data.name}</p>
      </div>
      <div className="specialization mt-4 bg-blue-100 py-1 px-4 rounded-full">
        <p className="text-base text-blue-700">{data.specializing}</p>
      </div>

      <div className="about mt-8 flex w-full space-x-7 px-2 justify-between items-center">
        <div className="rating">
          <ReactStars value={parseInt(data.rating!)} isEdit={false} />
        </div>
        <div className="experience flex-1 text-base">
          {data.experience} year{Number(data.experience) > 1 && "s"} experience
        </div>
      </div>
    </div>
  )
}
