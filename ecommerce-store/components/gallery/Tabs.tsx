import Image from "next/image";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Image as Img } from "@/types";

interface GalleryTabProps {
    image: Img
}
const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
    return (
        <Tab className="relative flex aspect-square rounded-md cursor-pointer items-center justify-center">
            {({ selected }) => {
                return (
                    <div>
                        <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
                            <Image src={image.url} fill alt="" className="object-cover
                            object-center"/>
                        </span>
                        <span className={cn(`absolute inset-0 rounded-md ring-offset-2`, selected ? "ring-black" : "ring-transparent")} />
                    </div>
                )
            }}
        </Tab>);
}

export default GalleryTab;