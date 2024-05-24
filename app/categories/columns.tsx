"use client";

import EditCategoryDialog from "@/components/EditCategoryDialog";
import EditOrganizationDialog from "@/components/EditOrganizationDialog";
import { Button } from "@/components/ui/button";
import { deleteCategory, deleteOrganization } from "@/data/firestore";
import { JournalCategory, Organization } from "@/global";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const columns: ColumnDef<JournalCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: function CellComponent({ row }) {
      const router = useRouter();
      const handleDelete = async () => {
        try {
          const deletePromise = deleteCategory(row.original.name);
          toast.promise(deletePromise, {
            loading: "Deleting category...",
            success: "Category deleted!",
            error: "Failed to delete category",
          });
          await deletePromise;
          router.refresh();
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
      };

      return (
        <div className="flex gap-2">
          <EditCategoryDialog category={row.original} />
          <Button onClick={handleDelete} variant={"outline"} size={"icon"}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
