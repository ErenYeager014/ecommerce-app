"use client"
import * as Z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios"
import { useStoreModel } from "@/hooks/use-store-model";
import { Model } from "../Model";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "../form";
import { Input } from "../input"
import { Button } from "../button";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export const StoreModel = () => {
    const [loading, setloading] = useState(false)
    const formSchema = Z.object({
        name: Z.string().min(1),
    })

    const form = useForm<Z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })
    const onSubmit = async (values: Z.infer<typeof formSchema>) => {
        try {
            setloading(true);
            const response = await axios.post('/api/stores', values);
            window.location.assign(`/${response.data.id}`);
        } catch (err) {
            toast.error("somethimg Went wrong")
        }
        finally {
            setloading(false)
        }
    }
    const storeModel = useStoreModel()
    return (
        <Model title="Create Store"
            description="Add a new Storage to manage product and category"
            isOpen={storeModel.isOpen}
            onClose={storeModel.onClose}
        >
            <div>
                <div className=" space-y-4 py-2 pb-4">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control}
                                name="name" render={
                                    ({ field }) =>
                                    (<FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="E-commerece" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)

                                } />
                            <div className="pt-5 space-x-2 flex items-center gap-2 justify-end w-full">
                                <Button disabled={loading} variant={"outline"} onClick={storeModel.onClose}>cancel</Button>
                                <Button disabled={loading} type="submit"> Submit</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Model>
    )
}