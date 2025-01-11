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
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const supabase = createClient();

export function ViewDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const fetchDocuments = async () => {
      const result = await supabase.from("documents").select();
      const documents: Document[] = result.data!;
      setDocuments(documents);
      const { data: user } = await supabase.auth.getUser();
      console.log(user);
      setIsAdmin((user as any)?.user_metadata?.role === "admin");
    };
    fetchDocuments();
  }, []);
  return (
    <div>
      <Table className="border rounded-xl">
        <TableCaption>A list of your recent data.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>File URL</TableHead>
            <TableHead className="text-right">Uploaded At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document: Document) => (
            <TableRow key={document.id}>
              <TableCell>
                {isAdmin ? (
                  document.status
                ) : (
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
              <TableCell>{document.file_url}</TableCell>
              <TableCell className="text-right">
                {moment(document.uploaded_at).format("h:mm a, MMM Do YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
