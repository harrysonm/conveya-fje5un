import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function FormNotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="w-12 h-12 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
          <FileText className="h-6 w-6 text-neutral-400" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Form not found</h1>
        <p className="text-neutral-500 mb-6">
          The form you&apos;re looking for doesn&apos;t exist or has been deleted.
        </p>
        <Button asChild>
          <Link href="/">
            Return to Conveya
          </Link>
        </Button>
      </div>
    </div>
  );
}