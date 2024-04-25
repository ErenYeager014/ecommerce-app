"use client";

import { useEffect, useState } from "react";
import { Model } from "@/components/ui/Model";
import { Button } from "@/components/ui/button";

interface AlertModel {
    isOpen: boolean;
    onClose: () => void;
    onConform: () => void;
    loading: boolean;

}

const AlertModel = ({ isOpen, onClose, onConform, loading }: AlertModel) => {
    const [isMounted, setisMounted] = useState(false)
    useEffect(() => {
        setisMounted(true)
    }, [])
    console.log(isMounted)
    if (!isMounted) {
        return null;
    }
    return (<Model title="Are you sure about that?"
        description="this action can be undone"
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className="pt-6 w-full space-x-2 flex items-center justify-end">
            <Button disabled={loading}
                variant={"outline"}
                onClick={onClose}>
                Cancel</Button>
            <Button disabled={loading}
                variant={"destructive"}
                onClick={onConform}>
                Confirm</Button>
        </div>
    </Model>);
}

export default AlertModel;