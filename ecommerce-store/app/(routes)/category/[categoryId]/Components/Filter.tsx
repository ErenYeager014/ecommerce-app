"use client"

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string"
interface FilterProps {
    data: (Size | Color)[]
    name: string
    valueKey: string
}
export const Filter = ({ data, name, valueKey }: FilterProps) => {
    const searchParams = useSearchParams()
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());
        const query = {
            ...current,
            [valueKey]: id
        }
        if (current[valueKey] === id) {
            query[valueKey] = null;
        }
        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true })
        router.push(url)
    }
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold">
                {
                    name
                }
                <hr className="my-4" />
                <div className="flex flex-wrap gap-2">
                    {
                        data.map((item) => (
                            <div key={item.id} className="flex items-center">
                                <Button className={
                                    cn('rounded-md text-sm text-gray-800 bg-white border border-gray-300', selectedValue === item.id ? 'bg-black text-white' : '')
                                } onClick={() => onClick(item.id)}>
                                    {item.name}
                                </Button>
                            </div>
                        ))
                    }
                </div>
            </h3>
        </div>
    );
}