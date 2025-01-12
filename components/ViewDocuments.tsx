"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Document } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

const supabase = createClient();

export function ViewDocuments() {
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    const result = await supabase.from("documents").select();
    const documents: Document[] = result.data!;
    setDocuments(documents);
    const { data: user } = await supabase.auth.getUser();
    setIsAdmin(user.user?.user_metadata.role === "admin");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const updateDocumentStatus = async (value: string, documentId: string) => {
    const { data, error } = await supabase
      .from("documents")
      .update({
        status: value,
      })
      .eq("id", documentId);
    if (error) {
      console.error(error);
    }
    toast.success("Document status updated successfully");
    fetchDocuments();
  };

  return (
    <div>
      {isLoading ? (
        <div className="text-center w-full mt-40">Loading...</div>
      ) : (
        <Table className="border rounded-xl">
          <TableCaption>A list of your recent data.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>File URL</TableHead>
              <TableHead className="text-right">Uploaded At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document: Document) => (
              <TableRow key={document.id}>
                <TableCell>{document.file_url}</TableCell>
                <TableCell className="text-right">
                  {moment(document.uploaded_at).format("h:mm a, MMM Do YYYY")}
                </TableCell>
                <TableCell>
                  {!isAdmin ? (
                    document.status
                  ) : (
                    <Select
                      value={document.status}
                      onValueChange={(value) =>
                        updateDocumentStatus(value, document.id)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
