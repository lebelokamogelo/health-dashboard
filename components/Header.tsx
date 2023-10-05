"use client"
import React from "react"
import { Notification } from "./Notifications"
import { usePathname } from "next/navigation"
import Search from "./Search"

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
        <Search />
      </div>
      <div className="flex space-x-3">
        <Notification icon="notification" label="Notification" />
      </div>
    </div>
  )
}
