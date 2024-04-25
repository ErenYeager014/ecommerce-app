import { cn } from "@/lib/utils";
import React, { ForwardedRef, forwardRef } from "react";
export interface ButtonPops extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}
const Button = forwardRef<HTMLButtonElement, ButtonPops>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button {...props} ref={ref} className={cn(` w-auto rounded-full 
        px-5 py-3 disabled:cursor-not-allowed text-white font-semibold
        hover:opacity-75 transition bg-black border-transparent`, className)}>
            {children}
        </button>
    )
})

Button.displayName = "Button"
export default Button;