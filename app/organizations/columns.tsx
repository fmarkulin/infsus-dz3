"use client";

import EditOrganizationDialog from "@/components/EditOrganizationDialog";
import { Button } from "@/components/ui/button";
import { deleteOrganization } from "@/data/firestore";
import { Organization } from "@/global";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: function CellComponent({ row }) {
      const router = useRouter();
      const handleDelete = async () => {
        console.log("delete organization");
        try {
          const deletePromise = deleteOrganization(row.original.id);
          toast.promise(deletePromise, {
            loading: "Deleting organization...",
            success: "Organization deleted!",
            error: "Failed to delete organization",
          });
          await deletePromise;
          router.refresh();
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <div className="flex gap-2">
          <EditOrganizationDialog organization={row.original} />
          <Button onClick={handleDelete} variant={"outline"} size={"icon"}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
