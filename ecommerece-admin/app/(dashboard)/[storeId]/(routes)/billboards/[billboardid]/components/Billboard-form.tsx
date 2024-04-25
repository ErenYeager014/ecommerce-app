"use client";

import Headings from "@/components/ui/Heading";
import { BillBoard, store } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { LucideTableRowsSplit, Trash } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { FormField, FormItem, FormLabel, FormControl, Form, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModel from "@/components/ui/Models/Alert-model";
import { useOrigin } from "@/hooks/use-origin";
import ImageUplaod from "@/components/ui/Image-upload";
interface BillBoardFormPops {
    initialData: BillBoard | null;
}
const formSchema = z.object({
    label: z.string().min(1),
    imageURL: z.string().min(1)
})
type BillboardFormValue = z.infer<typeof formSchema>;
const BillboardForm: React.FC<BillBoardFormPops> = ({ initialData }) => {
    const [open, setopen] = useState(false);
    const [loading, setloading] = useState(false)
    const params = useParams()
    const router = useRouter();
    const form = useForm<BillboardFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: "", imageURL: "",
        },
    })
    const title = initialData ? "Edit a  billboard" : "Create Billboard";
    const description = initialData ? "Edit a  description" : "Add a new Billboard";
    const toastMessage = initialData ? "Billboard Updated" : "Billboard Create";
    const action = initialData ? "save changes" : "Create";
    const onDelete = async () => {
        try {
            setloading(true);
            await axios.delete(`/api/${params?.storeId}/billboard/${initialData?.id}`)
            router.refresh();
            router.push("/")
        } catch (error) {
            toast.error("make sure to remove category and products first");
        } finally {
            setloading(false);
            setopen(false)
        }
    }
    const onSubmit = async (data: BillboardFormValue) => {
        try {
            setloading(true);
            if (initialData) {

                await axios.patch(`/api/${params.storeId}/billboards/${initialData.id}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/billboards`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error("someting went wrong")
        } finally {
            setloading(false)
        }
    }

    return (
        <>
            <AlertModel
                isOpen={open}
                onClose={() => { setopen(false) }}
                onConform={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Headings title={title} description={description} />
                {
                    initialData &&
                    <Button disabled={loading} onClick={() => setopen(true)} variant={"destructive"} size={"sm"}><Trash className="h-4 w-4" /></Button>
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full" >
                    <FormField
                        control={form.control}
                        name="imageURL"
                        render={({ field }) => (<FormItem>
                            <FormLabel>Background Image</FormLabel>
                            <FormControl>
                                <ImageUplaod
                                    value={field.value ? [field.value] : []}
                                    disabled={loading}
                                    onChange={(url) => field.onChange(url)}
                                    onRemove={() => field.onChange("")}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (<FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Billboard Label..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)

                            }
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit" >{action}</Button>
                </form>
            </Form>
            <Separator className="mt-2" />
            {/* <ApiALert title="NEXT_PUBLIC_API_URL" desription={`${origin}/api/${initialData.id  "id"}`} variant="public" /> */}
        </>
    )
}

export default BillboardForm 