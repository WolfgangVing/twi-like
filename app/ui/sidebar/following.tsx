"use client";

import { useSideBar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client"
import { UserItem } from "../user-item";

type FollowingProps = {
    data: (Follow & { following: User })[]
};

export const Following = ({ data }: FollowingProps) => {
    const {collapsed} = useSideBar((state) => state);

    if (!data.length) {
        return null;
    };


    return (
        <div>
            {!collapsed && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">
                        Following
                    </p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((follow) => (
                    <UserItem
                        key={follow.following.id}
                        username={follow.following.username}
                        imageURL={follow.following.imageUrl}
                    />
                ))}
            </ul>
        </div>
    )
}