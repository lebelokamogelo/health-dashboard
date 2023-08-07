import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle } from "../ui/card"

type dataProps = {
  name: string
  email: string
  money: number
}
const data: Array<dataProps> = [
  {
    name: "Olivia Martin",
    email: "oliviamartin@example.com",
    money: 50.45,
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    money: 80.99,
  },
  {
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
    money: 75.85,
  },
]

const avatarFallBackName = (name: string) =>
  name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")

export function RecentSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Recent Sales</CardTitle>
      </CardHeader>
      <div className="px-8 py-4 space-y-8">
        {data.map((item) => {
          return (
            <div key={item.email} className="flex items-center">
              <Avatar className="h-14 w-14">
                <AvatarImage src="" alt="Avatar" />
                <AvatarFallback>{avatarFallBackName(item.name)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-lg font-normal leading-none">{item.name}</p>
                <p className="text-base text-gray-500">{item.email}</p>
              </div>
              <div className="ml-auto text-lg font-medium">${item.money}</div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
