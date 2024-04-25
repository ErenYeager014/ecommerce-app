"use client"
import { product } from "@/types";
import React from "react";
import Currency from "@/components/ui/Currency";
import Button from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import useCartModel from "@/hooks/ue-carts";

interface InfoProps {
    data: product;
}
const InfoComponent: React.FC<InfoProps> = ({ data }) => {
    const cart = useCartModel();
    const handleCart = () => {
        cart.addItem(data);
    }
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price} />
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex items-center gap-x-4 ">
                <h1 className="font-semibold text-black">size:</h1>
                <div>
                    {data?.sizes?.name}({data?.sizes?.value})
                </div>
            </div>
            <div className="flex items-center gap-x-4 mt-4">
                <h1 className="font-semibold text-black">color:</h1>
                <div className="h-6 w-6 rounded-full border-gray-600" style={{
                    backgroundColor: data?.colors?.value,

                }} />
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button className="flex items-center gap-x-4" onClick={handleCart}>
                    Add To cart
                    <ShoppingCart className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default InfoComponent;