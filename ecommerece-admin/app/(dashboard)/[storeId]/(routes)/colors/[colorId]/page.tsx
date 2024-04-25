import prismaDB from "@/lib/Prismadb";
import ColorForm from "./components/color-form";

const ColorPage = async ({ params }: {
    params: {
        colorId: string,
    }
}) => {
    const color = await prismaDB.color.findUnique({
        where: {
            id: params.colorId,
        }
    })
    return (
        <div className="flex-col">
            <div className="flex-1 spae-y-4 p-8 pt-6">
                <ColorForm initialData={color} />
            </div>
        </div>);
}

export default ColorPage;