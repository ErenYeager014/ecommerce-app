import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboards from "@/components/Billboard";
import { Container } from "@/components/ui/Container";
import { Filter } from "./Components/Filter";
import NoResult from "@/components/ui/no-results";
import getCategory from "@/actions/get-categories";
import ProductCard from "@/components/ui/product-card";
import MobileFilter from "./Components/MobileFilter";

interface CategoryProps {
    params: {
        categoryId: string
    },
    searchParams: {
        colorId: string;
        sizeId: string;
    }
}
export const revalidate = 0;
const Category = async ({
    params, searchParams
}: CategoryProps) => {
    const products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId,
    });
    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(params.categoryId);
    return (
        <div className="bg-white">
            <Container>
                <Billboards data={category.Billboard} />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilter sizes={sizes} colors={colors} />
                        <div className="hidden lg:block">
                            <Filter name="size" valueKey="sizeId" data={sizes} />
                            <Filter name="Color" valueKey="colorId" data={colors} />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {
                                products.length === 0 && <NoResult />
                            }
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {
                                    products.map((product) => {
                                        return <ProductCard key={product.id} data={product} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>);
}

export default Category;