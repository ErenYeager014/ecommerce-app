import prismaDB from "@/lib/Prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }
    const store = await prismaDB.store.findFirst({
        where: {
            userID: userId
        }
    })
    if (store) {
        redirect(`/${store.id}`)
    }
    return <>{children}</>
}

export default Layout;