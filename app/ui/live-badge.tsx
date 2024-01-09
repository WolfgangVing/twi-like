import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";


type LiveBadgeProps = {
    className?: string;
}
export const liveBadgeSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "text-[10px]"
            }
        }
    }
)
export const LiveBadge = ({className}: LiveBadgeProps) => {
    return (
        <p className={cn(
            `bg-rose-500 text-center p-0.5  px-1.5 
            rounded-md uppercase text-[10px]
            border border-background font-semibold
            tracking-wide`,
            className
        )}>
            Live
        </p>
    )
}