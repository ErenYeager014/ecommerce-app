import prismaDB from "@/lib/Prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(req: Request, { params }: {
    params: {
        storeId: string,
        sizeId: string
    }
}) {
    try {
        const { userId } = auth();

        const { name, value } = await req.json();

        if (!userId) {
            console.log("unauthorized")
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!(params.storeId && params.sizeId)) {
            // console.log(params.storeId, params.categoryId)
            return new NextResponse("storeID and sizeId is required", { status: 400 })
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
        const size = await prismaDB.size.update({
            where: {
                id: params.sizeId,
                storeId: params.storeId,

            },
            data: {
                name,
                value,
            }
        })
        return NextResponse.json(size)

    } catch (err) {
        console.log("[SIZE_PATCH]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: {
    params: {
        storeId: string,
        sizeId: string
    }
}) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!(params.storeId && params.sizeId)) {
            return new NextResponse("storeID and sizeId is required", { status: 400 })
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
        const size = await prismaDB.size.deleteMany({
            where: {
                id: params.sizeId,
                storeId: params.storeId,
            },
        })
        return NextResponse.json(size)

    } catch (err) {
        console.log("[SIZE_DELETE]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: {
    params: {
        storeId: string
        sizeId: string
    }
}) {
    try {

        if (!params.sizeId) {
            return new NextResponse("sizeID is required", { status: 400 })
        }

        const category = await prismaDB.category.findUnique({
            where: {
                id: params.sizeId,
                storeId: params.storeId,
            },
        })
        return NextResponse.json(category)

    } catch (err) {
        console.log("[SIZE_GET]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}