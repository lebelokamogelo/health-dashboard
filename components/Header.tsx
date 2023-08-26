"use client";
import React, { useState } from "react";
import { Notification } from "./Notifications";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  return (
    <div
      className={`relative ${
        ["/auth/login", "/auth/forgot", "/not-found"].includes(path)
          ? "hidden"
          : "lg:flex"
      } flex items-center justify-between px-2 h-14 lg:h-20 lg:px-6`}
    >
      <div className="greeting">
        <p className="text-xl font-medium lg:text-2xl text-slate-800">
          Good Morning Dr. Smith
        </p>
      </div>
      <div className="flex space-x-3">
        <Notification icon="notification" label="Notifications" />
      </div>
    </div>
  );
}
