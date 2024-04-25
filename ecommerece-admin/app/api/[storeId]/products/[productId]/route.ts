import prismaDB from "@/lib/Prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(req: Request, { params }: {
    params: {
        storeId: string,
        productId: string
    }
}) {
    try {
        const { userId } = auth();

        const { name,
            price,
            categoryId,
            colorId,
            sizeId,
            isFeatured,
            isArchived,
            images } = await req.json();

        if (!userId) {
            console.log("unauthorized")
            return new NextResponse("UnAuthorized", { status: 401 })
        }

        if (!(params.storeId && params.productId)) {
            return new NextResponse("storeID and productId is required", { status: 400 })
        }

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

        const storeByUserId = await prismaDB.store.findFirst({
            where: {
                id: params.storeId,
                userID: userId,
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Forbidden", { status: 403 })
        }
        await prismaDB.product.update({
            where: {
                id: params.productId,
                storeId: params.storeId,
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                Image: {
                    deleteMany: {}
                },
                isFeatured,
                isArchived,
            }
        })
        const product = await prismaDB.product.update({
            where: {
                id: params.productId,
                storeId: params.storeId,
            },
            data: {
                Image: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })
        return NextResponse.json(product)

    } catch (err) {
        console.log("[PRODUCT_PATCH]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: {
    params: {
        storeId: string,
        productId: string
    }
}) {
    try {

        if (!(params.storeId && params.productId)) {
            return new NextResponse("storeID and productId is required", { status: 400 })
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

        const product = await prismaDB.product.deleteMany({
            where: {
                id: params.productId,
                storeId: params.storeId,
            },
        })
        return NextResponse.json(product)

    } catch (err) {
        console.log("[PRODUCT_DELETE]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: {
    params: {
        storeId: string
        productId: string
    }
}) {
    try {

        if (!params.productId) {
            return new NextResponse("productId is required", { status: 400 })
        }

        const product = await prismaDB.product.findUnique({
            where: {
                id: params.productId,
                storeId: params.storeId,
            },
            include: {
                Image: true,
                category: true,
                colors: true,
                sizes: true
            }
        })
        return NextResponse.json(product)

    } catch (err) {
        console.log("[PRODUCT_GET]", err);
        return new NextResponse("Internal Error", { status: 500 })
    }
}