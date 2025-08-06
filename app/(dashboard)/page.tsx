"use client";

import {DataTable} from "./data-table";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">User Management</h1>
      <DataTable />
    </div>
  );
}
