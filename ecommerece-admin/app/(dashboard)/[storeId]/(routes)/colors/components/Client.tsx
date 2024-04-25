"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./Column";
import { DataTable } from "@/components/ui/data-tabe";
import ApiList from "@/components/ui/api-list";
interface ColorProps {
    data: ColorColumn[]
}
const Color: React.FC<ColorProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams()
    return (<>
        <div className="flex items-center justify-between">
            <Heading title={`colors (${data.length})`}
                description="Manage colors for your store" />
            <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                <Plus className="w-4 mr-2 h-4" />
                Add New
            </Button>
        </div>
        <Separator />
        <DataTable columns={columns} data={data} searchKey="name" />
        <Heading title="API" description="API calls for color" />
        <Separator />
        <ApiList
            entitlyName="color"
            entityIdName="colorId"
        />
    </>);
}

export default Color;