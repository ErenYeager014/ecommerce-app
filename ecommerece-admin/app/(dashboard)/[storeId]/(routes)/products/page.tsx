import prismaDB from "@/lib/Prismadb";
import { ProductColumn } from "./components/Column";
import { format } from "date-fns"
import { formatter } from "@/lib/utils";
import Product from "./components/client";
const Billboards = async ({
    params,
}: {
    params: {
        storeId: string;
    }
}) => {
    const products = await prismaDB.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true,
            sizes: true,
            colors: true,

        },
        orderBy: {
            createdAt: "desc",
        }
    })
    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        price: formatter.format(item.price.toNumber()),
        isArchived: item.isArchived,
        category: item.category.name,
        size: item.sizes.value,
        color: item.colors.value,
        createdAt: format(item.createdAt, "MMMM do,yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">

                <Product data={formattedProducts} />

            </div>
        </div>

    );
}

export default Billboards;