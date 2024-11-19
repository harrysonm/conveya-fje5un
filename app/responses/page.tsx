"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { ResponsesHeader } from "@/components/responses/responses-header";
import { ResponsesTable } from "@/components/responses/responses-table";

export default function ResponsesPage() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <ResponsesHeader />
        <ResponsesTable />
      </main>
    </div>
  );
}