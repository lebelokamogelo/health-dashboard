"use client";
import Image from "next/image";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowDownRight,
  Calendar,
  DollarSign,
  FolderDown,
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
      width="270px"
    >
      <Menu className="text-lg text-slate-800">
        <div className="div">
          <div>
            <div className="overflow-hidden h-28 bg-slate-800"></div>
            <div className="relative w-24 h-24 mx-auto -mt-16 overflow-hidden border-4 border-white rounded-full">
              <Image
                className="object-cover object-center h-24"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                alt="Profile"
                fill
              />
            </div>
            <div className="mt-2 text-center">
              <h2 className="font-medium">Sarah Smith</h2>
              <p className="text-base text-gray-500">sarah@gmail.com</p>
            </div>
            <div className="p-4 mx-8 mt-4 border-t"></div>
          </div>
        </div>
        <MenuItem onClick={() => router.push("/")} icon={<LayoutDashboard />}>
          {" "}
          Dashboard
        </MenuItem>
        <MenuItem icon={<User2 />}> Doctor</MenuItem>
        <MenuItem icon={<User2 />}> Patient</MenuItem>
        <MenuItem icon={<Calendar />}> Appointment</MenuItem>
        <MenuItem icon={<Users2 />}> Employees</MenuItem>
        <MenuItem icon={<FolderDown />}> EMR</MenuItem>
        <MenuItem icon={<Pill />}> Medication</MenuItem>
        <MenuItem icon={<Settings />}> Settings</MenuItem>
        <SubMenu label="Account" icon={<User2 />}>
          <MenuItem icon={<DollarSign />}> Billing</MenuItem>
          <MenuItem
            icon={<ArrowDownRight />}
            onClick={() => router.push("/auth/login")}
          >
            {" "}
            Sign out
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}
