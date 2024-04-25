"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useStoreModel } from "@/hooks/use-store-model";
import { store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDownIcon, Plus, Store, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandList, CommandItem, CommandInput, CommandEmpty, CommandGroup, CommandSeparator } from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface storeSwitcherProps extends PopoverTriggerProps {
    items: store[];
}
export default function StoreSwitch({ className, items = [] }: storeSwitcherProps) {
    const storeModel = useStoreModel();
    const params = useParams();
    const router = useRouter();
    const formattedItems = items.map((item => ({
        label: item.name,
        value: item.id
    })));
    const currentStore = formattedItems.find((item) => item.value === params.storeId)
    const [open, setopen] = useState(false)
    const onStoreSelect = (store: { value: string, label: string }) => {
        setopen(false);
        router.push(
            `/${store.value}`
        )
    }
    return (
        <Popover open={open} onOpenChange={setopen}>
            <PopoverTrigger asChild>
                <Button variant={"outline"}
                    size={"sm"}
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select the store"
                    className={cn("w-[200px] justify-between", className)}
                ><Store className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-30" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-[200px] p-0"}>
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search Here..." />
                        <CommandEmpty>No stores Found</CommandEmpty>
                        <CommandGroup heading={"stores"}>

                            {formattedItems.map((item) => (
                                <CommandItem key={item.value} onClick={() => onStoreSelect(item)}>
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {item.label}
                                    <Check
                                        className={cn("ml-auto h-4 w-4", currentStore?.value === item.value ? "opacity-100" : 'opacity-0')} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    console.log("open model")
                                    setopen(false);
                                    storeModel.onOpen()
                                }}>
                                <Plus className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}