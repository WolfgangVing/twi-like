"use client"

import { cn } from "@/lib/utils"
import { useSideBar } from "@/store/use-sidebar"
import { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"

type ContainerProps = {
    children: React.ReactNode
}
export const Container = ({ children }: ContainerProps) => {
    const matches = useMediaQuery("(max-width:1024px)");
    const {
        collapsed,
        toggleCollapse,
        onCollapse,
        onExpand,
    } = useSideBar();

    useEffect(() => {
        if (matches) {
            onCollapse();
        } else {
            onExpand();
        }
    }, [matches, onCollapse, onExpand]);

    
    return (
        <div
            className={cn(
                "flex-1 ml-[70px] transition",
                collapsed || "lg:ml-60"
            )}
        >
            {children}
        </div>
    )
}