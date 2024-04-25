"use client";

import Headings from "@/components/ui/Heading";
import { store } from "@prisma/client";
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
import { useRouter } from "next/navigation";
import AlertModel from "@/components/ui/Models/Alert-model";
import ApiALert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
interface SettingFormPops {
    initialData: store;
}
const formSchema = z.object({
    name: z.string().min(1),
})
type settingsFormValue = z.infer<typeof formSchema>;
const SettingsForm: React.FC<SettingFormPops> = ({ initialData }) => {
    const [open, setopen] = useState(false);
    const [loading, setloading] = useState(false)
    const router = useRouter();
    const form = useForm<settingsFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: initialData.name },
    })
    const onDelete = async () => {
        try {
            setloading(true);
            await axios.delete(`/api/stores/${initialData.id}`)
            router.refresh();
            router.push("/")
        } catch (error) {
            toast.error("make sure to remove category and products first");
        } finally {
            setloading(false);
            setopen(false)
        }
    }
    const onSubmit = async (data: settingsFormValue) => {
        try {
            setloading(true);
            const result = await axios.patch(`/api/stores/${initialData.id}`, data);
            router.refresh();
            toast.success("store Updated successfully")
        } catch (error) {
            toast.error("someting went wrong")
        } finally {
            setloading(false)
        }
    }
    const origin = useOrigin();

    return (
        <>
            <AlertModel
                isOpen={open}
                onClose={() => { setopen(false) }}
                onConform={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Headings title="Settings" description="Manage store preferences" />
                <Button disabled={loading} onClick={() => setopen(true)} variant={"destructive"} size={"sm"}><Trash className="h-4 w-4" /></Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (<FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="E-commerece..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)
                            }
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit" >Save Changes</Button>
                </form>
            </Form>
            <Separator />
            <ApiALert title="NEXT_PUBLIC_API_URL" desription={`${origin}/api/${initialData.id}`} variant="public" />
        </>
    )
}

export default SettingsForm 