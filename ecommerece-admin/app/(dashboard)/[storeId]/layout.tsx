import Navbar from "@/components/Navbar";
import prismaDB from "@/lib/Prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashBoardLayout({ children, params }: { children: React.ReactNode, params: { sroreId: string } }) {
    const { userId } = auth();
    if (!userId) return redirect("/sing-in")
    const store = await prismaDB.store.findFirst({
        where: {
            id: params.sroreId,
            userID: userId,
        }
    })
    if (!store) {
        redirect("/")
    }
    return (
        <div >
            <Navbar />
            <div className="px-8">
                {children}
            </div>
        </div>
    )
}