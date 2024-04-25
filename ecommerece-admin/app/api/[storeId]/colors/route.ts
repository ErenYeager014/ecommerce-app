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

        const { name, value } = await req.json();

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }

        if (!(name && value)) {
            return new NextResponse("name and  value  is required", { status: 400 })
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
        const color = await prismaDB.color.create({
            data: {
                name,
                value,
                storeId: params.storeId,
            }
        })
        return NextResponse.json(color)
    } catch (err) {
        console.log("[COLOR_POST]", err);
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

        const colors = await prismaDB.color.findMany(
            {
                where: {
                    storeId: params.storeId
                },
            }
        )
        return NextResponse.json(colors)
    } catch (err) {
        console.log("[SIZE_GET]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}