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
        const { name, billboardId } = await req.json();
        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!(name && billboardId)) {
            return new NextResponse("name and  BillboardId  is required", { status: 400 })
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
        const category = await prismaDB.category.create({
            data: {
                name,
                billboardid: billboardId,
                storeId: params.storeId,
            }
        })
        return NextResponse.json(category)
    } catch (err) {
        console.log("[CATEGORY_POST]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: {
    params: {
        storeId: string
    }
}) {
    try {
        if (!params.storeId) {
            return new NextResponse("storeID is required", { status: 400 })
        }

        const category = await prismaDB.category.findMany(
            {
                where: {
                    storeId: params.storeId
                }
            }
        )
        console.log(category)
        return NextResponse.json(category)
    } catch (err) {
        console.log("[CATEGORY_GET]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}