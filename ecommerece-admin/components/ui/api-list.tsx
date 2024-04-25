"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import React from "react";
import ApiAlert from "./api-alert";

interface APiProps {
    entitlyName: string;
    entityIdName: string;
}
const ApiList: React.FC<APiProps> = ({
    entitlyName,
    entityIdName,
}) => {
    const params = useParams();
    const origin = useOrigin();
    const baseURL = `${origin}/api/${params.storeId}`
    return (
        <>
            <ApiAlert
                title="GET"
                variant="public"
                desription={`${baseURL}/${entitlyName}`}
            />
            <ApiAlert
                title="GET"
                variant="public"
                desription={`${baseURL}/${entitlyName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="POST"
                variant="admin"
                desription={`${baseURL}/${entitlyName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="PUT"
                variant="admin"
                desription={`${baseURL}/${entitlyName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="DELETE"
                variant="admin"
                desription={`${baseURL}/${entitlyName}/{${entityIdName}}`}
            />
        </>
    )
}

export default ApiList