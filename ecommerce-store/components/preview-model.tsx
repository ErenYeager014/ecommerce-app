"use client"

import usePreviewModel from "@/hooks/use-preview";
import { Model } from "./ui/model";
import Gallery from "./gallery/index";
import InfoComponent from "./Info";

const PreviewModel = () => {
    const previewModel = usePreviewModel()

    const product = usePreviewModel((state) => state.data)

    if (!product) {
        return null
    }

    return (
        <Model open={previewModel.isOpen} onClose={previewModel.onClose}>
            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                    <Gallery images={product.Image} />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                    <InfoComponent data={product} />
                </div>
            </div>
        </Model>
    );
}

export default PreviewModel;