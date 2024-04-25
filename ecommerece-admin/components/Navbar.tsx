import { auth, UserButton } from "@clerk/nextjs";
import MAinNav from "./MainNav";
import StoreSwitch from "./store-switcher";
import { redirect } from "next/navigation";
import prismaDB from "@/lib/Prismadb";

const Navbar = async () => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in")
    }
    const stores = await prismaDB.store.findMany({
        where: {
            userID: userId,
        }
    })
    return (<div className="boder-b">
        <div className="flex h-16 items-center px-4">
            <StoreSwitch items={stores} />
            <MAinNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    </div>);
}

export default Navbar;