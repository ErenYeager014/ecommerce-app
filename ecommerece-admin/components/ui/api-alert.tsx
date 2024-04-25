import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
interface ApiAlertProps {
    title: string;
    desription: string;
    variant: "public" | "admin";
}

const textmap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin",
}
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
}
const ApiALert: React.FC<ApiAlertProps> = ({
    title,
    desription,
    variant,
}) => {
    const onCopy = () => {
        navigator.clipboard.writeText(desription);
        toast.success("copied to clipboard")
    }
    return (<Alert>
        <Server className="w-4 h-4" />
        <AlertTitle className="flex items-center gap-x-2">
            {title}
            <Badge variant={variantMap[variant]}>{textmap[variant]}</Badge>
        </AlertTitle>
        <AlertDescription className="flex mt-4 item-center justify-between">
            <code className="relative rounded-sm bg-muted px-[0.7rem] py-[3px] font-mono text-sm font-semibold">
                {desription}
            </code>
            <Button variant={"outline"} size="icon" onClick={onCopy}>
                <Copy className="h-4 w-4" />
            </Button>
        </AlertDescription>
    </Alert>);
}

export default ApiALert;