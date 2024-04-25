"use client"

import { Button } from "@/components/ui/button";
import { SizeColumn } from "./Column";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModel from "@/components/ui/Models/Alert-model";


interface CellActionProps {
    data: SizeColumn;
}
const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    const [loading, setloading] = useState(false);
    const [open, setopen] = useState(false);
    const onDelete = async () => {
        try {
            setloading(true);
            // console.log(params.storeId, data.id)
            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
            router.refresh();
        } catch (error) {
            toast.error("make sure to remove category and products first");
        } finally {
            setloading(false);
            setopen(false)
        }
    }
    const onCopy = () => {
        navigator.clipboard.writeText(data.id);
        toast.success("Copied to clipboard");
    }
    return (
        <>
            <AlertModel
                loading={loading}
                isOpen={open}
                onConform={onDelete}
                onClose={() => setopen(false)} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="h-6 w-8 p-0">
                        <span className="sr-only">open Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onCopy}>
                        <Copy className="mr-2 h-4 w-4" />
                        copy id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setopen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    );
}

export default CellAction;