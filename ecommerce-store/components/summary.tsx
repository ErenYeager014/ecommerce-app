"use client";

import useCartModel from "@/hooks/ue-carts";
import Currency from "./ui/Currency";
import Button from "./ui/Button";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SummeryComponent = () => {
    const searchparams = useSearchParams()
    const cart = useCartModel()
    useEffect(() => {
        if (searchparams.get('success')) {
            toast.success("Payment Completed!")
            cart.removeAll()
        }
        if (searchparams.get('cancelled')) {
            toast.error("Payment Failed!")
        }
    }, [searchparams, cart.removeAll])

    const onCheckout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productIds: cart.item.map((item) => item.id)
                })
            })
            const data = await response.json()
            window.location = data.url;
        } catch (e) {
            toast.error("something went wrong");
        }
    }
    const totalamt = cart.item.reduce((acc, item) => (acc + Number(item.price)), 0)
    return (
        <div className="lg:col-span-5 rounded-md
         bg-gray-50 p-4 md:p-6 lg:p-8 w-full">
            <h3 className="font-semibold text-2xl border-b pb-2">
                Order summary
            </h3>
            <div className="py-3 my-3">
                <Currency value={totalamt} />
            </div>
            <Button className="w-full my-2" onClick={onCheckout}>
                Continue to checkout
            </Button>
        </div>);
}

export default SummeryComponent;