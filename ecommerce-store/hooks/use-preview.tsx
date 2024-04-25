import { create } from "zustand";

import { product } from "@/types";

interface PreviewModelProps {
    isOpen: boolean
    data?: product
    onOpen: (data: product) => void
    onClose: () => void
}

const usePreviewModel = create<PreviewModelProps>((set) => (
    {
        isOpen: false,
        onOpen: (data: product) => {
            set({
                data, isOpen: true
            })
        },
        onClose: () => { set({ isOpen: false }) }
    })
)

export default usePreviewModel;