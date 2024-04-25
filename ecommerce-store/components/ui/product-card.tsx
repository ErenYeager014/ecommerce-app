"use client";

import { product } from "@/types";
import Image from "next/image";
import React, { MouseEventHandler } from "react";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./Currency";
import { useRouter } from "next/navigation";
import usePreviewModel from "@/hooks/use-preview";
import useCartModel from "@/hooks/ue-carts";

interface ProductCardProps {
    data: product
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const previewmodel = usePreviewModel();
    const cart = useCartModel();
    const router = useRouter();
    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    }
    const handleModel: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        previewmodel.onOpen(data)
    }
    const addItem: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        cart.addItem(data)
    }
    return (
        <div onClick={handleClick} className="bg-whte group cursor-pointer rounded-xl border p-3 space-y-4">
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image src={data?.Image?.[0].url} fill alt="*produt Image" className="aspect-square object-cover rounded-md " />
                <div className="opacity-0 group-hover:opacity-100 
                transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton onClick={handleModel} icon={<Expand size={20} className="text-gray-600" />} />
                        <IconButton onClick={addItem} icon={<ShoppingCart size={20} className="text-gray-600" />} />
                    </div>
                </div>
            </div>
            <div>
                <p className="font-semibold text-lg capitalize">
                    {
                        data.name
                    }
                </p>
                <p className="text-gray-500 text-sm capitalize">
                    {
                        data.category.name
                    }
                </p>
            </div>
            <div className="flex items-center justify-between">
                <Currency value={data.price} />
            </div>
        </div>);
}

export default ProductCard;