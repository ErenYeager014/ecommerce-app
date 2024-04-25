"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";


interface ModelProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export const Model: React.FC<ModelProps> = ({ isOpen, onClose, children, description, title }) => {
    const onChange = (open: boolean) => {
        if (open) {
            onClose()
        }
    }
    return <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            <div>
                {children}
            </div>
        </DialogContent>
    </Dialog>
}