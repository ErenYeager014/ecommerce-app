"use client";
import { StoreModel } from "@/components/ui/Models/store-model";
import { useState, useEffect } from "react";


export const ModelProvider = () => {
    const [isMounted, setisMounted] = useState(false)
    useEffect(() => {
        setisMounted(true)
    }, [])
    if (!isMounted) {
        return null;
    }
    return (
        <StoreModel />
    )
}
