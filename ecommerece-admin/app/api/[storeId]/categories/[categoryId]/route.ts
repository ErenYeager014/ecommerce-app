import prismaDB from "@/lib/Prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(req: Request, { params }: {
    params: {
        storeId: string,
        categoryId: string
    }
}) {
    try {
        const { userId } = auth();

        const { name, billboardId } = await req.json();

        if (!userId) {
            console.log("unauthorized")
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!(params.storeId && params.categoryId)) {
            console.log(params.storeId, params.categoryId)
            return new NextResponse("storeID and CategoryId is required", { status: 400 })
        }

        if (!(name && billboardId)) {
            console.log(name, billboardId)
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
        const category = await prismaDB.category.update({
            where: {
                id: params.categoryId,
                storeId: params.storeId,

            },
            data: {
                name,
                billboardid: billboardId,
            }
        })
        return NextResponse.json(category)

    } catch (err) {
        console.log("[CATEGORY_POST]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: {
    params: {
        storeId: string,
        categoryId: string
    }
}) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!(params.storeId && params.categoryId)) {
            return new NextResponse("storeID and categoryId is required", { status: 400 })
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
        const category = await prismaDB.category.deleteMany({
            where: {
                id: params.categoryId,
                storeId: params.storeId,
            },
        })
        return NextResponse.json(category)

    } catch (err) {
        console.log("[CATEGORY_DELETE]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: {
    params: {
        storeId: string
        categoryId: string
    }
}) {
    try {

        if (!params.categoryId) {
            return new NextResponse("CategoryId is required", { status: 400 })
        }

        const category = await prismaDB.category.findUnique({
            where: {
                id: params.categoryId,
                storeId: params.storeId,
            },
            include: {
                Billboard: true
            }
        })
        return NextResponse.json(category)

    } catch (err) {
        console.log("[CATEGORY_GET]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}