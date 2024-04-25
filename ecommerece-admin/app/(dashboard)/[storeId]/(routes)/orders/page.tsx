import prismaDB from "@/lib/Prismadb";
import { OrdersColumn } from "./components/Column";
import { format } from "date-fns"
import { formatter } from "@/lib/utils";
import Order from "./components/client";
const Orders = async ({
    params,
}: {
    params: {
        storeId: string;
    }
}) => {
    const orders = await prismaDB.order.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            orderItem: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        }
    })
    const formattedOrders: OrdersColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItem.map((item) => item.product.name).join(","),
        totalPrice: formatter.format(item.orderItem.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do,yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {
                    orders &&
                    <Order data={formattedOrders} />
                }
            </div>
        </div>

    );
}

export default Orders;