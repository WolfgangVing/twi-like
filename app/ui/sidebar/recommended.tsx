"use client";

import { cn } from "@/lib/utils";
import { useSideBar } from "@/store/use-sidebar";
import { User } from "@prisma/client"
import { UserItem } from "../user-item";

type RecommendedProps = {
    data: User[]
}

export const Recommended = ({data} : RecommendedProps) => {
    const { collapsed } = useSideBar();

    const showLabel = !collapsed && data.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="pl-6 mb-4">
                    <p className="text-small text-mt">
                        Recommended
                    </p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((user) => (
                    <UserItem
                        key={user.id}
                        username={user.username}
                        imageURL={user.imageUrl}
                        isLive={true}
                    />
                ))}
            </ul>
        </div>
    )
}