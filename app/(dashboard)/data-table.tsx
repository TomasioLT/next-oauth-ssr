import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
}

const users: User[] = [
  {
    id: "user_001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Administrator",
    lastLogin: "2025-07-29 10:30 AM",
  },
  {
    id: "user_002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "Editor",
    lastLogin: "2025-07-28 03:15 PM",
  },
  {
    id: "user_003",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "Viewer",
    lastLogin: "2025-07-29 09:00 AM",
  },
  {
    id: "user_004",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    role: "Administrator",
    lastLogin: "2025-07-29 11:45 AM",
  },
  {
    id: "user_005",
    name: "Eve Adams",
    email: "eve.adams@example.com",
    role: "Editor",
    lastLogin: "2025-07-27 06:00 PM",
  },
  {
    id: "user_006",
    name: "Frank White",
    email: "frank.white@example.com",
    role: "Viewer",
    lastLogin: "2025-07-29 08:20 AM",
  },
  {
    id: "user_007",
    name: "Grace Hopper",
    email: "grace.hopper@example.com",
    role: "Administrator",
    lastLogin: "2025-07-29 01:00 PM",
  },
  {
    id: "user_008",
    name: "Henry Ford",
    email: "henry.ford@example.com",
    role: "Editor",
    lastLogin: "2025-07-28 10:00 AM",
  },
  {
    id: "user_009",
    name: "Ivy Green",
    email: "ivy.green@example.com",
    role: "Viewer",
    lastLogin: "2025-07-29 07:30 AM",
  },
  {
    id: "user_010",
    name: "Jack Black",
    email: "jack.black@example.com",
    role: "Administrator",
    lastLogin: "2025-07-29 02:40 PM",
  },
];

export function DataTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Last Login</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right">{user.lastLogin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
