"use client";

import EditEntryDialog from "@/components/EditEntryDialog";
import { Button } from "@/components/ui/button";
import { deleteEntry, getCategories, getOrganizations } from "@/data/firestore";
import { JournalCategory, JournalEntry, Organization } from "@/global";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const columns: ColumnDef<JournalEntry>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createTimestamp",
    header: "Created at",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: function CellComponent({ row }) {
      return row.original.category.name;
    },
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "organization",
    header: "Organization",
    cell: function CellComponent({ row }) {
      return row.original.organization.name;
    },
  },
  {
    accessorKey: "perpetrators",
    header: "Perpetrators",
    cell: function CellComponent({ row }) {
      return row.original.perpetrators.length;
    },
  },
  {
    accessorKey: "witnesses",
    header: "Witnesses",
    cell: function CellComponent({ row }) {
      return row.original.witnesses.length;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: function CellComponent({ row }) {
      const router = useRouter();
      const [categories, setCategories] = useState<
        JournalCategory[] | undefined
      >(undefined);
      const [organizations, setOrganizations] = useState<
        Organization[] | undefined
      >(undefined);

      useEffect(() => {
        (async () => {
          try {
            const categoriesPromise = getCategories();
            const organizationsPromise = getOrganizations();
            setCategories(await categoriesPromise);
            setOrganizations(await organizationsPromise);
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message);
            }
          }
        })();
      }, []);

      const handleDelete = async () => {
        try {
          const deletePromise = deleteEntry(row.original.id, row.original.uid);
          toast.promise(deletePromise, {
            loading: "Deleting entry...",
            success: "Entry deleted!",
            error: "Failed to delete entry",
          });
          await deletePromise;
          router.refresh();
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <div className="flex gap-2">
          {categories && organizations && (
            <EditEntryDialog
              entry={row.original}
              categories={categories}
              organizations={organizations}
            />
          )}
          <Button onClick={handleDelete} variant={"outline"} size={"icon"}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
