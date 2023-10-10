"use client"
import { auth } from "@/model/firebase"
import {
  ArrowDownRight,
  Calendar,
  LayoutDashboard,
  Settings,
  User2,
} from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SidebarComponent() {
  const router = useRouter()
  const path = usePathname()

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
              <div className="relative w-24 h-24 mx-auto -mt-16 overflow-hidden border-2 border-white rounded-full">
                <Image
                  className="object-cover object-center h-24"
                  src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                  alt="Profile"
                  fill
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="font-medium text-xl">support</h2>
                <p className="text-base text-gray-500">support@mail.com</p>
              </div>
              <div className="p-4 mx-8 mt-4 border-t"></div>
            </div>
          </div>
          <MenuItem
            className={`${
              path == "/" ? "bg-slate-100 text-slate-800" : "text-slate-600"
            }`}
            onClick={() => router.push("/")}
            icon={<LayoutDashboard />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/doctors")}
            className={`${
              path.includes("doctors")
                ? "bg-slate-100 text-slate-800"
                : "text-slate-600"
            }`}
            icon={<User2 />}
          >
            Doctor
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/patients")}
            className={`${
              path.includes("patients")
                ? "bg-slate-100 text-slate-800"
                : "text-slate-600"
            }`}
            icon={<User2 />}
          >
            Patient
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/appointments")}
            className={`${
              path.includes("appointments")
                ? "bg-slate-100 text-slate-800"
                : "text-slate-600"
            }`}
            icon={<Calendar />}
          >
            Appointment
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/calendar")}
            className={`${
              path.includes("calendar")
                ? "bg-slate-100 text-slate-800"
                : "text-slate-600"
            }`}
            icon={<Calendar />}
          >
            Calendar
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/settings")}
            className={`${
              path.includes("settings")
                ? "bg-slate-100 text-slate-800"
                : "text-slate-600"
            }`}
            icon={<Settings />}
          >
            Settings
          </MenuItem>

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
                      router.push("/auth/login")
                      auth.signOut()
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
  )
}
