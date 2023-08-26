"use client";
import Image from "next/image";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowDownRight,
  Calendar,
  LayoutDashboard,
  Pill,
  Settings,
  User2,
  Users2,
} from "lucide-react";

export default function SidebarComponent() {
  const router = useRouter();
  const path = usePathname();

  return (
    <Sidebar
      className={`relative ${
        ["/auth/login", "/auth/forgot", "/not-found"].includes(path)
          ? "lg:hidden"
          : "lg:block"
      } hidden`}
      width="280px"
    >
      <Menu className="text-lg text-slate-800">
        <div className="div">
          <div>
            <div className="overflow-hidden h-28 bg-slate-800"></div>
            <div className="relative w-24 h-24 mx-auto -mt-16 overflow-hidden border-4 border-white rounded-full">
              <Image
                className="object-cover object-center h-24"
                src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80"
                alt="Profile"
                fill
              />
            </div>
            <div className="mt-4 text-center">
              <h2 className="font-medium text-xl">Dr. Tim Smith</h2>
              <p className="text-base text-gray-500">timsmith@hospital.com</p>
            </div>
            <div className="p-4 mx-8 mt-4 border-t"></div>
          </div>
        </div>
        <MenuItem onClick={() => router.push("/")} icon={<LayoutDashboard />}>
          Dashboard
        </MenuItem>
        <MenuItem icon={<User2 />}> Doctor</MenuItem>
        <MenuItem icon={<User2 />}> Patient</MenuItem>
        <MenuItem icon={<Calendar />}> Appointment</MenuItem>
        <MenuItem icon={<Users2 />}> Employees</MenuItem>
        <MenuItem icon={<Pill />}> Medication</MenuItem>
        <MenuItem icon={<Settings />}> Settings</MenuItem>

        <MenuItem
          icon={<ArrowDownRight />}
          onClick={() => router.push("/auth/login")}
        >
          Sign out
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
