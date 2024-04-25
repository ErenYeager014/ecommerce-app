"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./Column";
import { DataTable } from "@/components/ui/data-tabe";
import ApiList from "@/components/ui/api-list";
interface BIllboardProps {
    data: BillboardColumn[]
}
const BillBoard: React.FC<BIllboardProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams()
    return (<>
        <div className="flex items-center justify-between">
            <Heading title={`Billboards (${data.length})`}
                description="Manage billboards for your store" />
            <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                <Plus className="w-4 mr-2 h-4" />
                Add New
            </Button>
        </div>
        <Separator />
        <DataTable columns={columns} data={data} searchKey="label" />
        <Heading title="API" description="API calls for BillBoards" />
        <Separator />
        <ApiList
            entitlyName="billboards"
            entityIdName="billboardId"
        />
    </>);
}

export default BillBoard;