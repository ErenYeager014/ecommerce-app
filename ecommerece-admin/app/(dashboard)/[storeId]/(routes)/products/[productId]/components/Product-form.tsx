"use client";

import Headings from "@/components/ui/Heading";
import { Image, Product, Size, Color, Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { FormField, FormItem, FormLabel, FormControl, Form, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModel from "@/components/ui/Models/Alert-model";
import ImageUplaod from "@/components/ui/Image-upload";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
interface ProductFormProps {
    initialData: Product & {
        images: Image[]
    } | null;
    sizes: Size[]
    colors: Color[]
    categories: Category[]
}
const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number(),
    sizeId: z.string().min(1),
    colorId: z.string().min(1),
    categoryId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
})
type ProductValueForm = z.infer<typeof formSchema>;
const ProductForm: React.FC<ProductFormProps> = ({ initialData, categories, sizes, colors }) => {
    const [open, setopen] = useState(false);
    const [loading, setloading] = useState(false)
    const params = useParams()
    const router = useRouter();
    const form = useForm<ProductValueForm>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: parseFloat(String(initialData?.price))
        } : {
            name: "",
            price: 0,
            colorId: "",
            sizeId: '',
            categoryId: "",
            images: [],
            isFeatured: false,
            isArchived: false
        },
    })
    const title = initialData ? "Edit a  Product" : "Create Product";
    const description = initialData ? "Edit a  Product" : "Add a new Product";
    const toastMessage = initialData ? "Product Updated" : "Product Create";
    const action = initialData ? "save changes" : "Create";
    const onDelete = async () => {
        try {
            setloading(true);
            await axios.delete(`/api/${params?.storeId}/products/${initialData?.id}`)
            router.refresh();
            router.push("/")
        } catch (error) {
            toast.error("make sure to remove category and products first");
        } finally {
            setloading(false);
            setopen(false)
        }
    }
    const onSubmit = async (data: ProductValueForm) => {
        try {
            setloading(true);
            if (initialData) {

                await axios.patch(`/api/${params.storeId}/products/${initialData.id}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/products`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/products`)
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
                        name="images"
                        render={({ field }) => (<FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <ImageUplaod
                                    value={field.value?.map((image) => (image.url))}
                                    disabled={loading}
                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                    onRemove={(url) => field.onChange([...field.value].filter((current) => current.url !== url))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (<FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Product Name..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)

                            }
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (<FormItem>
                                <FormLabel>price</FormLabel>
                                <FormControl>
                                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)

                            }
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (<FormItem>
                                <FormLabel>Category</FormLabel>
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
                                                    placeholder="Select a category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                (categories).map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>)}
                        />
                        <FormField
                            control={form.control}
                            name="sizeId"
                            render={({ field }) => (<FormItem>
                                <FormLabel>Sizes</FormLabel>
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
                                                    placeholder="Select a size"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                (sizes).map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}( {item.value})
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>)}
                        />
                        <FormField
                            control={form.control}
                            name="colorId"
                            render={({ field }) => (<FormItem>
                                <FormLabel>Colors</FormLabel>
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
                                                    placeholder="Select a color"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                (colors).map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}( {item.value})
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>)}
                        />
                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Featured</FormLabel>
                                    <FormDescription>
                                        This product will appear on the homepage
                                    </FormDescription>
                                </div>
                                <FormMessage />
                            </FormItem>)

                            }
                        />
                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Archived</FormLabel>
                                    <FormDescription>
                                        This product will not appear on the whole pages
                                    </FormDescription>
                                </div>
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

export default ProductForm 