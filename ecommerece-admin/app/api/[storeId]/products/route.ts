import prismaDB from "@/lib/Prismadb";
import { auth } from "@clerk/nextjs";
import { request } from "http";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: {
    params: {
        storeId: string
    }
}) {
    try {
        const { userId } = auth();

        const { name, price, categoryId, colorId, sizeId, isFeatured, isArchived, images } = await req.json();

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }

        if (!(images || images.length !== 0)) {
            return new NextResponse("images is required", { status: 400 })
        }

        if (!(colorId && sizeId && categoryId)) {
            return new NextResponse("categoryId ,sizeId and colorId  is required", { status: 400 })
        }

        if (!(name && price)) {
            return new NextResponse("name and  price  is required", { status: 400 })
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
        const product = await prismaDB.product.create({
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
                Image: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                },
                storeId: params.storeId,
            }
        })
        return NextResponse.json(product)
    } catch (err) {
        console.log("[PRODUCTS_POST]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: {
    params: {
        storeId: string
    }
}) {
    try {

        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const isFeatured = searchParams.get('isFeatured');
        if (!params.storeId) {
            return new NextResponse("storeID is required", { status: 400 })
        }

        const product = await prismaDB.product.findMany(
            {
                where: {
                    categoryId,
                    sizeId,
                    colorId,
                    isFeatured: isFeatured ? true : undefined,
                    storeId: params.storeId,
                },
                include: {
                    Image: true,
                    category: true,
                    colors: true,
                    sizes: true
                },
                orderBy: {
                    createdAt: "desc",
                }
            }
        )
        return NextResponse.json(product)
    } catch (err) {
        console.log("[Products_GET]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}