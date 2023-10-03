import { SidebarNav } from "@/components/setting/SidebarNav"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="px-10 pb-16 md:block">
        <div className="space-y-0.5">
          <p className="text-2xl">Settings</p>
          <p className="text-muted-foreground mt-2 text-base">
            Manage your account settings.
          </p>
        </div>
        <div className="flex flex-col mt-10 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}
