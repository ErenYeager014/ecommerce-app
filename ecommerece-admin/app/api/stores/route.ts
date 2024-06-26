import prismaDB from "@/lib/Prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { name } = await req.json();
        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        const store = await prismaDB.store.create({
            data: {
                name, userID: userId
            }
        })
        return NextResponse.json(store)
    } catch (err) {
        console.log("[stores_Post]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}