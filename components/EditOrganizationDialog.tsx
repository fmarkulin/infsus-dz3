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
import AddOrganizationForm from "./AddOrganizationForm";
import { useRef } from "react";
import { Organization } from "@/global";
import EditOrganizationForm from "./EditOrganizationForm";

interface EditOrganizationDialogProps {
  organization: Organization;
}

export default function EditOrganizationDialog({
  organization,
}: EditOrganizationDialogProps) {
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
          <DialogTitle>Edit organization data</DialogTitle>
          <DialogDescription>
            Input new name for the organization and update it in the database.
          </DialogDescription>
        </DialogHeader>
        <EditOrganizationForm closeRef={closeRef} organization={organization} />
      </DialogContent>
      <DialogClose ref={closeRef} />
    </Dialog>
  );
}
