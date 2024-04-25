"use client"
import { Container } from "@/components/ui/Container";
import useCartModel from "@/hooks/ue-carts";
import CartItem from "./components/cart-item";
import IconButton from "@/components/ui/icon-button";
import { Trash } from "lucide-react";
import SummeryComponent from "@/components/summary";

const CartPage = () => {
    const cart = useCartModel();

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-16 sm:px-6 w-full lg:px-8">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
                        <div className="float-right">
                            <IconButton icon={<Trash />} onClick={cart.removeAll} />
                        </div>
                    </div>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-3 lg:w-full">
                        <div className="lg:col-span-7">
                            {
                                cart.item.length === 0
                                && <p className="text-neutral-500">No items is added</p>
                            }
                            <ul className="w-full">
                                {
                                    cart.item.map((item) => {
                                        return (<CartItem data={item} key={item.id} />)
                                    })
                                }
                            </ul>
                        </div>
                        <SummeryComponent />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CartPage;