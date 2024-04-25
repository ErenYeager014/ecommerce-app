import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery/index";
import InfoComponent from "@/components/Info";
import { ProductList } from "@/components/product-list";
import { Container } from "@/components/ui/Container";
import { product } from "@/types";

interface ProductPageProps {
    params: {
        productId: string
    }
}
const ProductPage = async ({
    params
}: ProductPageProps) => {
    const product: product = await getProduct(params.productId);
    const suggestProducts = await getProducts({
        categoryId: product?.category?.id,
    })
    return (<div className="bg-white">
        <Container>
            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <Gallery images={product.Image} />
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <InfoComponent data={product} />
                    </div>
                </div>
                <hr className="mt-10" />
                <ProductList title="Related Items" items={suggestProducts} />
            </div>
        </Container>
    </div>);
}

export default ProductPage;