"use client";

import Headings from "@/components/ui/Heading";
import { BillBoard, Color, Size, store } from "@prisma/client";
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
import ImageUplaod from "@/components/ui/Image-upload";
interface ColorFormProps {
    initialData: Color | null;
}
const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})
type SizeFormValues = z.infer<typeof formSchema>;
const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
    const [open, setopen] = useState(false);
    const [loading, setloading] = useState(false)
    const params = useParams()
    const router = useRouter();
    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "", value: ""
        },
    })
    const title = initialData ? "Edit a  Colors" : "Create Colors";
    const description = initialData ? "Edit a  description" : "Add a new Colors";
    const toastMessage = initialData ? "Colors Updated" : "Colors Create";
    const action = initialData ? "save changes" : "Create";
    const onDelete = async () => {
        try {
            setloading(true);
            await axios.delete(`/api/${params?.storeId}/colors/${initialData?.id}`)
            router.push(`/${params.storeId}/colors`)
            router.refresh();
        } catch (error) {
            toast.error("make sure to remove category and products first");
        } finally {
            setloading(false);
            setopen(false)
        }
    }
    const onSubmit = async (data: SizeFormValues) => {
        try {
            setloading(true);
            if (initialData) {

                await axios.patch(`/api/${params.storeId}/colors/${initialData.id}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/colors`, data);
            }
            router.push(`/${params.storeId}/colors`)
            router.refresh();
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
                    <div className="grid grid-cols-3 gap-8 mt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (<FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Color Name ..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)

                            }
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (<FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-x-4">
                                        <Input disabled={loading} placeholder="Color value..." {...field} />
                                        <div className="border p-4 rounded-full"
                                            style={{
                                                backgroundColor: field.value,
                                            }}
                                        />
                                    </div>
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

export default ColorForm;