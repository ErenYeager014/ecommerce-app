"use client"
import PreviewModel from "@/components/preview-model";
import { useEffect, useState } from "react";

const ModelProvider = () => {
    const [mounted, setmounted] = useState(false)
    useEffect(() => {
        setmounted(true)
    }, [])
    if (!mounted) {
        return null
    }
    return (<>
        <PreviewModel />
    </>);
}

export default ModelProvider;