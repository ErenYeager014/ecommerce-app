"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type OrdersColumn = {
    id: string
    phone: string
    address: string
    isPaid: boolean
    totalPrice: string
    products: string

    createdAt: string
}

export const columns: ColumnDef<OrdersColumn>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "totalprice",
        header: "Total Price",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        accessorKey: "ispaid",
        header: "Payment",
    },

]
