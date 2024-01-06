"use client"

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { SideBarStore, useSideBar } from "@/store/use-sidebar"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
    const {
        collapsed,
        onCollapse,
        onExpand
    }: SideBarStore = useSideBar((state) => state);

    const label = collapsed ? "Expand" : "Collapse"
    return (
        <>
            {collapsed && (
                <div className="hidden lg:flex w-full items-center justify-center p-4 mb-4">
                    <Hint label={label} side="right" asChild>
                        <Button variant={"outline"} className="h-auto p-2" onClick={onExpand}>
                            <ArrowRightFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-3 mb-2 flex items-center w-full">
                    <p>For You!</p>
                    <Hint label={label} side="right" asChild>
                        <Button
                            className="h-auto p-2 ml-auto"
                            variant={"outline"}
                            onClick={onCollapse}
                        >
                            <ArrowLeftFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}