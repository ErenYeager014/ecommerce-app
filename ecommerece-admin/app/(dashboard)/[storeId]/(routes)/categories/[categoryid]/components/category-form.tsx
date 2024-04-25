"use client";

import Headings from "@/components/ui/Heading";
import { BillBoard, Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
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
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

interface CategoryProps {
    initialData: Category | null;
    billboards: BillBoard[]
}
const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1)
})
type CategoryFormVaalues = z.infer<typeof formSchema>;
const CategoryForm: React.FC<CategoryProps> = ({ initialData, billboards }) => {
    const [open, setopen] = useState(false);
    const [loading, setloading] = useState(false)
    const params = useParams()
    const router = useRouter();
    const form = useForm<CategoryFormVaalues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...initialData, billboardId: initialData?.billboardid
        } || {
            name: "", billboardId: "",
        },
    })
    const title = initialData ? "Edit a  Category" : "Create Category";
    const description = initialData ? "Edit a  Category" : "Add a new Category";
    const toastMessage = initialData ? "Category Updated" : "Category Create";
    const action = initialData ? "save changes" : "Create";
    const onDelete = async () => {
        try {
            setloading(true);
            await axios.delete(`/api/${params?.storeId}/categories/${initialData?.id}`)
            router.refresh();
            router.push("/")
        } catch (error) {
            toast.error("make sure to remove category and products first");
        } finally {
            setloading(false);
            setopen(false)
        }
    }
    const onSubmit = async (data: CategoryFormVaalues) => {
        try {
            setloading(true);
            if (initialData) {
                console.log(initialData);
                await axios.patch(`/api/${params.storeId}/categories/${initialData.id}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/categories`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/categories`)
            toast.success(toastMessage)
        } catch (error) {
            console.log(error)
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full my-2" >
                    <div className="grid grid-cols-3 gap-8 my-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (<FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Category Name..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)

                            }
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (<FormItem>
                                <FormLabel>Billbaord</FormLabel>
                                <FormControl>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a billboard"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                billboards.map((billboard) => (
                                                    <SelectItem
                                                        key={billboard.id}
                                                        value={billboard.id}
                                                    >
                                                        {billboard.label}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>

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
        </>
    )
}

export default CategoryForm 