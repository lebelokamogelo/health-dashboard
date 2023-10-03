import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { collection, getDocs } from "@firebase/firestore"
import { db } from "@/model/firebase"
import { uuid } from "uuidv4"
import { useEffect, useState } from "react"

type dataProps = {
  uuid: string
  name: string
  email: string
}

const avatarFallBackName = (name: string) =>
  name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")

export async function RecentPatient() {
  const data: Array<dataProps> = []

  const querySnapshot = await getDocs(collection(db, "patients"))

  querySnapshot.forEach((doc) => {
    data.push({
      uuid: doc.data().uuid,
      name: doc.data().name,
      email: doc.data().email,
    })
  })

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-medium text-slate-600">
            Recent Patient
          </CardTitle>
        </CardHeader>
        <div className="px-8 py-4 space-y-8">
          {data.map((item) => {
            return (
              <div key={uuid()} className="flex items-center">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    {avatarFallBackName(item.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-lg font-normal leading-none text-slate-800">
                    {item.name}
                  </p>
                  <p className="text-base text-gray-500">{item.email}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
