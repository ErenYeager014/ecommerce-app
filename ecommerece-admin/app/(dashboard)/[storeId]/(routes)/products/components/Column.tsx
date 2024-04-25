"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type ProductColumn = {
    id: string
    name: string
    price: string
    size: string
    color: string
    category: string
    isFeatured: boolean
    isArchived: boolean
    createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) =>
        (<div className="flex gap-x-3 items-center">
            {row.original.color}
            <div className="h-4 w-4 rounded-full" style={{
                backgroundColor: row.original.color
            }} />
        </div>)
    },
    {
        accessorKey: "isArchived",
        header: "Archived",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
