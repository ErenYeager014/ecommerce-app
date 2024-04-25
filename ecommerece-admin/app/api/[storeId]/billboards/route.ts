import prismaDB from "@/lib/Prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: {
    params: {
        storeId: string
    }
}) {
    try {
        const { userId } = auth();
        const { label, imageURL } = await req.json();
        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!(label && imageURL)) {
            return new NextResponse("Image or Label is required", { status: 400 })
        }
        if (!params.storeId) {
            return new NextResponse("storeID is required", { status: 400 })
        }
        const storeByUserId = await prismaDB.store.findFirst({
            where: {
                id: params.storeId,
                userID: userId,
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Forbidden", { status: 403 })
        }
        const billboard = await prismaDB.billBoard.create({
            data: {
                label,
                imageURL,
                storeId: params.storeId,
            }
        })
        return NextResponse.json(billboard)
    } catch (err) {
        console.log("[BILLBOARDS_POST]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: {
    params: {
        storeId: string
    }
}) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!params.storeId) {
            return new NextResponse("storeID is required", { status: 400 })
        }

        const billboard = await prismaDB.billBoard.findMany(
            {
                where: {
                    storeId: params.storeId
                }
            }
        )
        return NextResponse.json(billboard)
    } catch (err) {
        console.log("[BILLBOARDS_GET]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}