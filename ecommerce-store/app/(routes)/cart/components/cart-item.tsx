import IconButton from "@/components/ui/icon-button";
import useCartModel from "@/hooks/ue-carts";
import { product } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
    data: product
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
    const cart = useCartModel()
    const handleDelete = () => {
        cart.removeItem(data)
    }
    return (<li className="flex py-6 border-b w-full">
        <div className="relative h-24 w-24 rounded-md oveflow-hidden sm:h-48 sm:w-48">
            <Image
                fill
                src={data.Image[0].url}
                className=" object-cover object-center"
                alt=""
            />
            <div className="relative ml-4 flex flex-1 flex-col justify-between md:ml-6">
                <div className="absolute z-10 right-[-10px] top-[-10px]">
                    <IconButton icon={<X size={20} />} onClick={handleDelete} />
                </div>
            </div>
        </div>
        <div className="mx-6 flex-1 flex gap-x-6 justify-evenly">
            <div className="flex justify-between">
                <p className="text-lg font-semibold text-black">
                    {data.name}
                </p>
            </div>
            <div className="mt-1 flex text-sm">
                <p className="text-gray-500">
                    {data.colors.name}
                </p>
                <p className="text-gray-500 ml-2 border-l border-gray-200 pl-4 h-[min-content]">
                    {data.sizes.name}
                </p>
            </div>
        </div>


    </li>);
}

export default CartItem;