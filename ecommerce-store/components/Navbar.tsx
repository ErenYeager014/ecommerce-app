import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { MainNav } from "./main-nav";
import getCategories from "@/actions/get-category";
import NavbarActions from "./navbar-actions";
export const revalidate = 0;
export const Navbar = async () => {
    const categories = await getCategories()

    return (
        <div>
            <Container>
                <div className="relatice px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl uppercase">Store</p>
                    </Link>
                    <MainNav data={categories} />
                    <NavbarActions />
                </div>
            </Container>
        </div>
    );
}