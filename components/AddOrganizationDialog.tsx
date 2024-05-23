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
import AddOrganizationForm from "./AddOrganizationForm";
import { useRef } from "react";

export default function AddOrganizationDialog() {
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
          <DialogTitle>Add new organization</DialogTitle>
          <DialogDescription>
            Input name for the new organization and add it to the database.
          </DialogDescription>
        </DialogHeader>
        <AddOrganizationForm closeRef={closeRef} />
      </DialogContent>
      <DialogClose ref={closeRef} />
    </Dialog>
  );
}
