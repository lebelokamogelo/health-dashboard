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
import { auth } from "@/model/firebase";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function SidebarComponent() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div>
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
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
                  alt="Profile"
                  fill
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="font-medium text-xl">Admin</h2>
                <p className="text-base text-gray-500">suppport@mail.com</p>
              </div>
              <div className="p-4 mx-8 mt-4 border-t"></div>
            </div>
          </div>
          <MenuItem onClick={() => router.push("/")} icon={<LayoutDashboard />}>
            Dashboard
          </MenuItem>
          <MenuItem icon={<User2 />}>
            <Link href={"/doctors"}>Doctor</Link>
          </MenuItem>
          <MenuItem icon={<User2 />}>
            <Link href={"/patients"}> Patient </Link>
          </MenuItem>
          <MenuItem icon={<Calendar />}>
            <Link href={"/appointments"}>Appointment</Link>
          </MenuItem>
          <MenuItem icon={<Users2 />}> Employees</MenuItem>
          <MenuItem icon={<Pill />}> Medication</MenuItem>
          <MenuItem icon={<Settings />}> Settings</MenuItem>

          <MenuItem icon={<ArrowDownRight />}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="">Sign out</div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      router.push("/auth/login");
                      auth.signOut();
                    }}
                  >
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
