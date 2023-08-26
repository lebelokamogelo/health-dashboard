"use client";

import { Bell, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Menu } from "@headlessui/react";
import Link from "next/link";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type Props = {
  icon?: string;
  label: string;
};

export function Notification({ label }: Props) {
  return (
    <Menu>
      <Menu.Button className="notification flex items-center justify-center h-12 w-12 rounded-full hover:bg-slate-200 p-2.5">
        <Bell />
      </Menu.Button>

      <div className="absolute z-50 mt-14 right-4">
        <Menu.Items>
          <Card className={cn("w-[380px]")}>
            <CardHeader>
              <CardTitle className="mb-2 font-medium text-xl">
                {label}
              </CardTitle>
              <CardDescription className="text-base">
                You have {notifications.length} unread notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex w-2 h-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/" className="w-full">
                {" "}
                <Button className="flex items-center w-full bg-slate-700 hover:bg-slate-800">
                  View all {label.toLowerCase()}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </Menu.Items>
      </div>
    </Menu>
  );
}
