import prismaDB from "@/lib/Prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(req: Request, { params }: {
    params: {
        storeId: string,
        colorId: string
    }
}) {
    try {
        const { userId } = auth();

        const { name, value } = await req.json();

        if (!userId) {
            console.log("unauthorized")
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!(params.storeId && params.colorId)) {
            // console.log(params.storeId, params.categoryId)
            return new NextResponse("storeID and colorId is required", { status: 400 })
        }

        if (!(name && value)) {
            console.log(name, value)
            return new NextResponse("Name or BillboardId is required", { status: 400 })
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
        const color = await prismaDB.color.update({
            where: {
                id: params.colorId,
                storeId: params.storeId,
            },
            data: {
                name,
                value,
            }
        })
        return NextResponse.json(color)

    } catch (err) {
        console.log("[COLOR_PATCH]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: {
    params: {
        storeId: string,
        colorId: string
    }
}) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!(params.storeId && params.colorId)) {
            return new NextResponse("storeID and colorId is required", { status: 400 })
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
        const color = await prismaDB.color.deleteMany({
            where: {
                id: params.colorId,
                storeId: params.storeId,
            },
        })
        return NextResponse.json(color)

    } catch (err) {
        console.log("[COLOR_DELETE]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: {
    params: {
        storeId: string
        colorId: string
    }
}) {
    try {

        if (!params.colorId) {
            return new NextResponse("colorId is required", { status: 400 })
        }

        const color = await prismaDB.color.findUnique({
            where: {
                id: params.colorId,
                storeId: params.storeId,
            },
        })
        return NextResponse.json(color)

    } catch (err) {
        console.log("[COLOR_GET]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}