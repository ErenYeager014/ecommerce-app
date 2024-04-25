import prismaDB from "@/lib/Prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(req: Request, { params }: {
    params: {
        storeId: string,
        billboardId: string
    }
}) {
    try {
        const { userId } = auth();

        const { label, imageURL } = await req.json();

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!(params.storeId && params.billboardId)) {
            return new NextResponse("storeID and billboardid is required", { status: 400 })
        }

        if (!(label && imageURL)) {
            return new NextResponse("Image or Label is required", { status: 400 })
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
        const billboard = await prismaDB.billBoard.update({
            where: {
                id: params.billboardId,
                storeId: params.storeId,
            },
            data: {
                label,
                imageURL,
            }
        })
        return NextResponse.json(billboard)

    } catch (err) {
        console.log("[BILLBOARDS_PUT]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: {
    params: {
        storeId: string,
        billboardId: string
    }
}) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!(params.storeId && params.billboardId)) {
            return new NextResponse("storeID and billboardid is required", { status: 400 })
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
        const billboard = await prismaDB.billBoard.deleteMany({
            where: {
                id: params.billboardId,
                storeId: params.storeId,
            },
        })
        return NextResponse.json(billboard)

    } catch (err) {
        console.log("[BILLBOARD_DELETE]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: {
    params: {

        billboardId: string
    }
}) {
    try {

        if (!params.billboardId) {
            return new NextResponse("billboardid is required", { status: 400 })
        }

        const billboard = await prismaDB.billBoard.findUnique({
            where: {
                id: params.billboardId,
            },
        })
        return NextResponse.json(billboard)

    } catch (err) {
        console.log("[BILLBOARD_GET]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}