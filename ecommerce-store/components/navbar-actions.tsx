"use client"

import Button from "@/components/ui/Button";
import useCartModel from "@/hooks/ue-carts";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarActions = () => {
    const [isMounted, setisMounted] = useState(false)
    const route = useRouter()
    const cart = useCartModel()
    useEffect(() => {
        setisMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }
    const redirect = () => {
        route.push('/cart')
    }
    return (<div className="ml-auto flex flex-row items-center gap-x-4">
        <Button className="flex items-center rounded-full bg-black px-4 py-2" onClick={redirect}>
            <ShoppingBag size={20} color="white" />
            <span className="ml-2 text-sm font-medium text-white">
                {cart.item.length}
            </span>
        </Button>
    </div>);
}

export default NavbarActions;