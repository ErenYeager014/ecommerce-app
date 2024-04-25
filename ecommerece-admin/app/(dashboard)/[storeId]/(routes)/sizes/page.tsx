import prismaDB from "@/lib/Prismadb";
import { SizeColumn } from "./components/Column";
import { format } from "date-fns"
import Size from "./components/client";
const Sizes = async ({
    params,
}: {
    params: {
        storeId: string;
    }
}) => {
    const sizes = await prismaDB.size.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        }
    })
    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do,yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {
                    sizes &&
                    <Size data={formattedSizes} />
                }
            </div>
        </div>

    );
}

export default Sizes;