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
import { Pencil } from "lucide-react";
import { useRef } from "react";
import { JournalCategory } from "@/global";
import EditCategoryForm from "./EditCategoryForm";

interface EditCategoryDialogProps {
  category: JournalCategory;
}

export default function EditCategoryDialog({
  category,
}: EditCategoryDialogProps) {
  const closeRef = useRef(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit category data</DialogTitle>
          <DialogDescription>
            Input new description for the category and update it in the
            database.
          </DialogDescription>
        </DialogHeader>
        <EditCategoryForm closeRef={closeRef} category={category} />
      </DialogContent>
      <DialogClose ref={closeRef} />
    </Dialog>
  );
}
