import prismaDB from "@/lib/Prismadb";
import BillboardForm from "./components/Billboard-form";

const BillboardPage = async ({ params }: {
    params: {
        billboardid: string,
    }
}) => {
    const billboard = await prismaDB.billBoard.findUnique({
        where: {
            id: params.billboardid,
        }
    })
    return (
        <div className="flex-col">
            <div className="flex-1 spae-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard} />
            </div>
        </div>);
}

export default BillboardPage;