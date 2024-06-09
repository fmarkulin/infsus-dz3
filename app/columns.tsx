"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: function CellComponent({ row }) {
      return dayjs(row.original.created).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
  },
  {
    accessorKey: "cName",
    header: "C.Name",
    cell: function CellComponent({ row }) {
      return row.original.variables.name.value || "N/A";
    },
  },
  {
    accessorKey: "cDescription",
    header: "C.Description",
    cell: function CellComponent({ row }) {
      return row.original.variables.description.value || "N/A";
    },
  },
];
