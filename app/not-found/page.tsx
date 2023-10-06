"use client"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="flex items-center justify-center w-full h-full p-5">
      <div className="text-center">
        <div className="inline-flex p-4 rounded-full bg-sky-100">
          <div className="p-4 rounded-full stroke-sky-600 bg-sky-200">
            <svg
              className="w-14 h-14"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <h1 className="mt-5 text-[24px] font-semibold text-slate-800 lg:text-[32px]">
          404 - Not Found
        </h1>
        <p className="text-slate-600 mt-5 text-[20px]">
          Oops! That page can&apos;t be Found
        </p>
        <div
          className="p-2 mt-10 border rounded-md cursor-pointer prev border-slate-500 hover:bg-slate-100"
          onClick={() => router.back()}
        >
          Go Back
        </div>
      </div>
    </div>
  )
}
