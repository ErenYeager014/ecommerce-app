import prismaDB from "@/lib/Prismadb";
import { ColorColumn } from "./components/Column";
import { format } from "date-fns"
import Color from "./components/client";
const Colors = async ({
    params,
}: {
    params: {
        storeId: string;
    }
}) => {
    const color = await prismaDB.color.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        }
    })
    const formattedSizes: ColorColumn[] = color.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do,yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {
                    color &&
                    <Color data={formattedSizes} />
                }
            </div>
        </div>

    );
}

export default Colors;