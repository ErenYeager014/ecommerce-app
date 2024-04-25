import prismaDB from "@/lib/Prismadb";
import ProductForm from "./components/Product-form"

const ProductPage = async ({ params }: {
    params: {
        productId: string,
        storeId: string
    }
}) => {
    const product = await prismaDB.product.findUnique({
        where: {
            id: params.productId,
        },
        include: {
            Image: true,
        }
    })
    const categories = await prismaDB.category.findMany(
        {
            where: {
                storeId: params.storeId,
            }
        }
    )
    const sizes = await prismaDB.size.findMany(
        {
            where: {
                storeId: params.storeId,
            }
        }
    )
    const color = await prismaDB.color.findMany(
        {
            where: {
                storeId: params.storeId,
            }
        }
    )
    console.log(product)
    return (
        <div className="flex-col">
            <div className="flex-1 spae-y-4 p-8 pt-6">
                <ProductForm initialData={product ? {
                    ...product, images: [...product?.Image]
                } : null} sizes={sizes} colors={color} categories={categories} />
            </div>
        </div>);
}

export default ProductPage;