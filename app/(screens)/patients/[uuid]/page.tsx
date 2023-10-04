import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import React from "react"

export default function page({ params }: { params: { uuid: String } }) {
  const email = params.uuid

  const avatarFallBackName = (name: string) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")

  return (
    <div className="max-w-[1240px] mx-auto">
      <p>Patient Information</p>

      <div className="information mt-8 ">
        <div className="image bg-white p-6 rounded-md">
          <div className="avatar flex items-center space-x-3 mt-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>{avatarFallBackName("Kamogelo")}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-base">Kamogelo</p>
              <p className="text-base text-blue-600 underline">
                Kamogelo@mail.com
              </p>
            </div>
          </div>

          <div className="line mt-8 w-full h-[1px] bg-slate-300"></div>

          <div className="name flex flex-col space-y-2 mt-8">
            <label className="text-base text-slate-800 opacity-80">
              Full names
            </label>
            <input
              type="text"
              className="px-4 py-2 rounded-md bg-transparent text-base border-[1px] border-slate-200 w-[520px] outline-none"
            />
          </div>
        </div>

        <div className="contact mt-4 bg-white p-6 rounded-md">
          <p className="text-lg">Contact Information</p>
          <div className="flex space-x-8">
            <div className="name flex flex-col space-y-2 mt-8">
              <label className="text-base text-slate-800 opacity-80">
                Contact Phone
              </label>
              <input
                type="text"
                className="px-4 py-2 rounded-md bg-transparent text-base border-[1px] border-slate-200 w-[520px] outline-none"
              />
            </div>
            <div className="email flex flex-col space-y-2 mt-8">
              <label className="text-base text-slate-800 opacity-80">
                Email Address
              </label>
              <input
                type="text"
                className="px-4 py-2 rounded-md bg-transparent text-base border-[1px] border-slate-200 w-[520px] outline-none"
              />
            </div>
          </div>
          <p className="text-lg mt-8">Security</p>
          <div className="password flex flex-col space-y-2 mt-4">
            <label className="text-base text-slate-800 opacity-80">
              Password
            </label>

            <div className="flex items-center space-x-8">
              <input
                type="text"
                className="px-4 py-2 rounded-md bg-transparent text-base border-[1px] border-slate-200 w-[520px] outline-none"
              />
              <Button className="bg-slate-700 text-base hover:bg-slate-800">
                Update password
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="button mt-8 mx-4">
        <Button className="bg-slate-700 text-base hover:bg-slate-800">
          Update profile
        </Button>
      </div>
    </div>
  )
}
