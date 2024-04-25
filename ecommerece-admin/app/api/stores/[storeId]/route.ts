import prismaDB from "@/lib/Prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req: Request,
    { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        const { name } = await req.json();
        if (!name) {
            return new NextResponse("status is required", { status: 400 })
        }
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 400 })
        }

        const store = await prismaDB.store.updateMany({
            where: {
                id: params.storeId,
                userID: userId,
            },
            data: {
                name,
            },
        })
        return NextResponse.json(store)
    } catch (error) {
        console.log("[store_patch]", error)
        return new NextResponse("internal Error", { status: 500 })
    }
}


export async function DELETE(req: Request,
    { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }

        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 400 })
        }

        const store = await prismaDB.store.deleteMany({
            where: {
                id: params.storeId,
                userID: userId,
            },
        })
        return NextResponse.json(store)
    } catch (error) {
        console.log("[store_patch]", error)
        return new NextResponse("internal Error", { status: 500 })
    }
} 