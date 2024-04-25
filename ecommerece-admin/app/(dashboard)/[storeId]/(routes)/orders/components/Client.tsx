"use client";

import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator";

import { columns, OrdersColumn } from "./Column";
import { DataTable } from "@/components/ui/data-tabe";

interface OrdersProps {
    data: OrdersColumn[]
}
const Order: React.FC<OrdersProps> = ({ data }) => {
    return (<>
        <Heading title={`Orders (${data.length})`}
            description="Manage Orders for your store" />
        <Separator />
        <DataTable columns={columns} data={data} searchKey="products" />
    </>);
}

export default Order;