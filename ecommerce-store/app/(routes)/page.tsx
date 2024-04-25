import getBillboards from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboards from "@/components/Billboard";
import { ProductList } from "@/components/product-list";
import { Container } from "@/components/ui/Container";
import { Billboard } from "@/types";
export const revalidate = 0;
const Home = async () => {
    const products = await getProducts({ isFeatured: true });
    const billboard: Billboard = await getBillboards('97ecc8b3-6e40-45f0-9ee5-e87e5d9c6f9e');
    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboards data={billboard} />
            </div>
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                <ProductList title="featured Products" items={products} />
            </div>
        </Container>
    );
}

export default Home;