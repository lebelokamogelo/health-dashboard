import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "../ui/card";

type dataProps = {
  name: string;
  email: string;
};
const data: Array<dataProps> = [
  {
    name: "Olivia Martin",
    email: "oliviamartin@example.com",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
  },
  {
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
  },
];

const avatarFallBackName = (name: string) =>
  name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

export function RecentPatient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium text-slate-600">
          Recent Patient
        </CardTitle>
      </CardHeader>
      <div className="px-8 py-4 space-y-8">
        {data.map((item) => {
          return (
            <div key={item.email} className="flex items-center">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" alt="Avatar" />
                <AvatarFallback>{avatarFallBackName(item.name)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-lg font-normal leading-none text-slate-800">
                  {item.name}
                </p>
                <p className="text-base text-gray-500">{item.email}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
