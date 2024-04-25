"use client";
import React, { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: 'INR',
})
interface CurrencyProps {
    value?: string | number;
}
const Currency: React.FC<CurrencyProps> = ({
    value
}) => {
    const [ismounted, setismounted] = useState(false)
    useEffect(() => {
        setismounted(true)
    }, [])
    if (!ismounted) {
        return null;
    }
    return (<div className="font-semibold">
        {
            formatter.format(Number(value))
        }
    </div>);
}

export default Currency;