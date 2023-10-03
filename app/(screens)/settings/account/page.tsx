import { Button } from "@/components/ui/button"
import React from "react"

export default function Account() {
  return (
    <div>
      <p className="text-xl">Account Settings</p>
      <div className="flex items-center space-x-8">
        <div className="information mt-8 space-y-6">
          <div className="username flex flex-col space-y-4">
            <label className="text-lg text-slate-800">Username</label>
            <input
              type="text"
              className="px-4 py-2 rounded-md bg-transparent border-[1px] border-slate-200 w-[520px] outline-none"
              value="support"
              disabled
            />
          </div>

          <div className="password flex flex-col space-y-4">
            <label className="text-lg text-slate-800">Password</label>
            <input
              type="text"
              className="px-4 py-2 rounded-md bg-transparent border-[1px] border-slate-200 w-[520px] outline-none"
            />
          </div>

          <div className="button">
            <Button className="text-base bg-slate-700 hover:bg-slate-800">
              Save changes
            </Button>
          </div>

          <div className="delete bg-white p-4 space-y-5">
            <p className="text-xl">Delete Account</p>
            <p className="text-sm">
              Delete account is permenant and cannot be reversed
            </p>
            <Button className="text-base bg-red-500 hover:bg-red-600 px-10">
              Delete
            </Button>
          </div>
        </div>

        <div className="requirements bg-slate-200 py-4 px-8 rounded-sm">
          <p>Password requirements</p>
          <ul className="text-sm mt-3">
            <li>At least 8 characters</li>
            <li>At least one uppercase</li>
            <li>At least one number</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
