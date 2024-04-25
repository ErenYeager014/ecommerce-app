import { product } from "@/types";
import NoResult from "./ui/no-results";
import ProductCard from "./ui/product-card";

type ProductListProps = {
    title: string;
    items: product[];
}
export const ProductList = ({ title, items }: ProductListProps) => {
    return (
        <div className="space-y-4 mb-3">
            <h3 className="font-bold text-3xl uppercase">{title}</h3>
            {
                items.length === 0 && <NoResult />
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grrid-cols-4 gap-4">
                {
                    items.map((item) => {
                        return (<ProductCard key={item.id} data={item} />)
                    })
                }
            </div>
        </div>
    );
}