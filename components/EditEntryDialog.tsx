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
import { Pencil, Trash } from "lucide-react";
import { useRef } from "react";
import { JournalCategory, JournalEntry, Organization } from "@/global";
import EditEntryForm from "./EditEntryForm";
import { deleteImg } from "@/data/storage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteImgFromEntry } from "@/data/firestore";

interface EditEntryDialogProps {
  categories: JournalCategory[];
  organizations: Organization[];
  entry: JournalEntry;
}

export default function EditEntryDialog({
  categories,
  organizations,
  entry,
}: EditEntryDialogProps) {
  const closeRef = useRef(null);
  const router = useRouter();

  const handleImgDelete = async (url: string) => {
    try {
      let deletePromise = deleteImg(entry.uid, entry.id, url);
      toast.promise(deletePromise, {
        loading: "Deleting image from storage",
        success: "Image deleted from storage",
        error: "Failed to delete image from storage",
      });
      await deletePromise;
      deletePromise = deleteImgFromEntry(entry.id, url);
      toast.promise(deletePromise, {
        loading: "Deleting image from entry",
        success: "Image deleted from entry",
        error: "Failed to delete image from entry",
      });
      await deletePromise;
      window.location.reload();
    } catch (error) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit journal entry</DialogTitle>
          <DialogDescription>
            Input the details for the updated journal entry and update it in the
            database.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {entry.attachments.map((attachment, index) => (
            <div key={attachment} className="flex flex-col gap-1 items-center">
              <img src={attachment} className="w-20 h-20" />
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => handleImgDelete(attachment)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <EditEntryForm
          closeRef={closeRef}
          categories={categories}
          organizations={organizations}
          entry={entry}
        />
      </DialogContent>
      <DialogClose ref={closeRef} />
    </Dialog>
  );
}
