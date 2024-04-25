import prismaDB from "@/lib/Prismadb";
import BillBoard from "./components/client";
import { CategoryColumn } from "./components/Column";
import { format } from "date-fns"
import Category from "./components/client";
const Categories = async ({
    params,
}: {
    params: {
        storeId: string;
    }
}) => {
    const categories = await prismaDB.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            Billboard: true
        },
        orderBy: {
            createdAt: "desc",
        }
    })
    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.Billboard.label,
        createdAt: format(item.createdAt, "MMMM do,yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {
                    categories &&
                    <Category data={formattedCategories} />
                }
            </div>
        </div>

    );
}

export default Categories;