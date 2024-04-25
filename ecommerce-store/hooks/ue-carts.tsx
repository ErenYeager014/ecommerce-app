import { create } from "zustand";

import { product } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface CartModel {

    item: product[]
    addItem: (data: product) => void
    removeItem: (data: product) => void
    removeAll: () => void
}

const useCartModel = create(persist<CartModel>((set, get) => ({
    item: [],
    addItem: (data) => {
        const isexist = get().item.find(item => item.id === data.id)
        if (isexist) {
            return toast.success("Item is already Exists")
        }
        set((state) => ({
            item: [...state.item, data]
        }))
        toast.success("Item is Added")
    },
    removeItem: (data) => {
        set((state) => ({
            item: state.item.filter((item) => item.id !== data.id)

        }))
        toast.success("Item is Removed")
    },
    removeAll: () => {
        set((state) => ({
            item: []
        }))
        toast.success("All Items are Removed")
    }
}), {
    name: "cart-Storage",
    storage: createJSONStorage(() => localStorage)
}))


export default useCartModel;