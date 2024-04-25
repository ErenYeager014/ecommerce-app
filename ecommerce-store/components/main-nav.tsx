"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    data: Category[];

}
export const MainNav = ({ data }: Props) => {
    const pathname = usePathname();
    const route = data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }))
    return (
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            {
                route.map((route) => (
                    <Link href={route.href}
                        key={route.href}
                        className={cn('text-sm font-medium transition-color hover:text-black', route.active ? 'text-black' : 'text-neutral-500')}
                    >{route.label}</Link>
                ))
            }
        </nav>
    );
}