"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useRef } from "react";
import AddEntryForm from "./AddEntryForm";
import { JournalCategory, Organization } from "@/global";

interface AddEntryDialogProps {
  categories: JournalCategory[];
  organizations: Organization[];
}

export default function AddEntryDialog({
  categories,
  organizations,
}: AddEntryDialogProps) {
  const closeRef = useRef(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new journal entry</DialogTitle>
          <DialogDescription>
            Input the details for the new journal entry and add it to the
            database.
          </DialogDescription>
        </DialogHeader>
        <AddEntryForm
          closeRef={closeRef}
          categories={categories}
          organizations={organizations}
        />
      </DialogContent>
      <DialogClose ref={closeRef} />
    </Dialog>
  );
}
