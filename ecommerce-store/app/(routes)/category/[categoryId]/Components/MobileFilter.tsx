"use client"

import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { Filter } from "./Filter";

interface MobileFilterProps {
    sizes: Size[]
    colors: Color[]
}
const MobileFilter: React.FC<MobileFilterProps> = ({ sizes, colors }) => {
    const [open, setopen] = useState(false)
    const onOpen = () => setopen(true)
    const onCLose = () => setopen(false)
    return (
        <div className="lg:hidden">
            <Button onClick={onOpen} className="flex gap-x-2 items-center">
                Filter
                <Plus size={20} />
            </Button>
            <Dialog open={open} as="div" className={'relative z-40'} onClose={onCLose}>
                <div className="fixed inset-0 bg-black bg-opacity-25">
                    <Dialog.Panel className={'relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl'}>
                        <div className="flex items-center justify-end px-4">
                            <IconButton icon={<X size={20} onClick={onCLose} />} />
                        </div>
                        <div className="p-4">
                            <Filter name="size" valueKey="sizeId" data={sizes} />
                            <Filter name="Color" valueKey="colorId" data={colors} />
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}

export default MobileFilter;