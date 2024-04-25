"use client";
import { Tab } from "@headlessui/react";
import { Image as ImgType } from "@/types"
import React from "react";
import GalleryTab from "./Tabs";
import Image from "next/image";
interface ImgProps {
    images: ImgType[]
}
const Gallery: React.FC<ImgProps> = ({ images }) => {
    return (
        <Tab.Group as={"div"} className="flex flex-col-reverse gap-y-4">
            <div className="mx-auto  w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                    {
                        images.map((image) => {
                            return <GalleryTab key={image.id} image={image} />
                        })
                    }
                </Tab.List>
            </div>
            <Tab.Panels className={"aspect-square w-full"}>
                {
                    images.map((image) => {
                        return <Tab.Panel key={image.id}>
                            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                                <Image fill src={image.url} alt={" "} className={'object-cover object-center'} />
                            </div>
                        </Tab.Panel>
                    })
                }
            </Tab.Panels>
        </Tab.Group>
    );
}

export default Gallery;