"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns, SizeColumn } from "./Column";
import { DataTable } from "@/components/ui/data-tabe";
import ApiList from "@/components/ui/api-list";
interface SizeProps {
    data: SizeColumn[]
}
const Size: React.FC<SizeProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams()
    return (<>
        <div className="flex items-center justify-between">
            <Heading title={`sizes (${data.length})`}
                description="Manage sizes for your store" />
            <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                <Plus className="w-4 mr-2 h-4" />
                Add New
            </Button>
        </div>
        <Separator />
        <DataTable columns={columns} data={data} searchKey="name" />
        <Heading title="API" description="API calls for sizes" />
        <Separator />
        <ApiList
            entitlyName="sizes"
            entityIdName="sizeid"
        />
    </>);
}

export default Size;