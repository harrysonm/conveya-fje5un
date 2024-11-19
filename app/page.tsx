import { FormList } from "@/components/forms/form-list";
import { FormHeader } from "@/components/forms/form-header";
import { Sidebar } from "@/components/layout/sidebar";

export default function HomePage() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <FormHeader />
        <FormList />
      </main>
    </div>
  );
}