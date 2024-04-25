import prismaDB from "@/lib/Prismadb";
import CategoryForm from "./components/category-form";

const CategoryPage = async ({ params }: {
    params: {
        categoryid: string,
        storeId: string;
    }
}) => {
    const category = await prismaDB.category.findUnique({
        where: {
            id: params.categoryid,
        }
    })
    const billboards = await prismaDB.billBoard.findMany({
        where: {
            storeId: params.storeId,
        }
    });
    return (
        <div className="flex-col">
            <div className="flex-1 spae-y-4 p-8 pt-6">
                <CategoryForm initialData={category} billboards={billboards} />
            </div>
        </div>);
}

export default CategoryPage;