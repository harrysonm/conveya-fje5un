"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useFormStore } from "@/stores/form-store";
import { useResponseStore } from "@/stores/response-store";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Inbox } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

export function ResponsesTable() {
  const params = useParams();
  const [search, setSearch] = useState("");
  const form = useFormStore(state => state.forms.find(f => f.id === params.id));
  const responses = useResponseStore(state => state.getFormResponses(params.id as string));
  const deleteResponse = useResponseStore(state => state.deleteResponse);

  const handleDeleteResponse = (id: string) => {
    deleteResponse(id);
    toast({
      description: "Response deleted"
    });
  };

  const filteredAndSortedResponses = responses
    .filter(response => {
      const searchLower = search.toLowerCase();
      return Object.values(response.data).some(value => 
        String(value).toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  if (!form) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center text-sm text-neutral-500">
          Form not found
        </div>
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
            <Inbox className="h-6 w-6 text-neutral-400" />
          </div>
          <h2 className="text-lg font-semibold mb-2">
            No responses yet
          </h2>
          <p className="text-sm text-neutral-500">
            Responses to your form will appear here
          </p>
        </div>
      </div>
    );
  }

  const fields = form.fields.filter(f => f.type !== 'heading' && f.type !== 'paragraph');

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-[240px]">
            <Input
              placeholder="Search responses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md"
            />
          </div>
          <span className="text-sm text-neutral-500">
            {filteredAndSortedResponses.length} responses
          </span>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submitted</TableHead>
                {fields.map((field) => (
                  <TableHead key={field.id}>{field.label}</TableHead>
                ))}
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedResponses.map((response) => (
                <TableRow key={response.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">
                        {format(new Date(response.submittedAt), 'MMM d, yyyy')}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {format(new Date(response.submittedAt), 'h:mm a')}
                      </span>
                    </div>
                  </TableCell>
                  {fields.map((field) => (
                    <TableCell key={field.id}>
                      {String(response.data[field.label] || '')}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteResponse(response.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}