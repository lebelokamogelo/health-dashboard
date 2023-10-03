"use client"
import React from "react"
import { Notification } from "./Notifications"
import { usePathname } from "next/navigation"

export default function Header() {
  const path = usePathname()

  return (
    <div
      className={`relative ${
        ["/auth/login", "/auth/forgot", "/not-found"].includes(path)
          ? "hidden"
          : "lg:flex"
      } flex items-center justify-between px-2 h-14 lg:h-20 lg:px-6`}
    >
      <div className="search">
        <input
          type="text"
          placeholder="Type to search"
          className=" bg-slate-50 outline-none p-4 rounded-3xl shadow-md"
        />
      </div>
      <div className="flex space-x-3">
        <Notification icon="notification" label="Notification" />
      </div>
    </div>
  )
}
