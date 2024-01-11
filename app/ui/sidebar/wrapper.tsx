"use client";

import { cn } from "@/lib/utils"
import { useSideBar } from "@/store/use-sidebar"
import { useEffect, useState } from "react";
import { FollowingSkeleton, RecommendedSkeleton, ToggleSkeleton } from "../skeletons";

type WrapperProps = {
    children: React.ReactNode
    className?: string
}
export const Wrapper = ({ children }: WrapperProps) => {
    const { collapsed } = useSideBar();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, [])

    if (!isClient) return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkeleton />
            <FollowingSkeleton />
            <RecommendedSkeleton />
        </aside>
    );

    return (
        <aside className={cn(
            "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
            collapsed && "w-[70px]"
        )}>
            {children}
        </aside>
    )
}