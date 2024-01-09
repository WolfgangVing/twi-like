import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSideBar } from "@/store/use-sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { UserAvatar } from "./user-avatar";
import { LiveBadge } from "./live-badge";


export type UserItemProps = {
    username: string,
    imageURL: string,
    isLive?: boolean
}
export const UserItem = ({ username, imageURL, isLive }: UserItemProps) => {
    const pathname = usePathname();

    const { collapsed } = useSideBar();

    const href = `/${username}`;
    const isActive = pathname === href;


    return (
        <Button
            asChild
            variant={"ghost"}
            className={cn(
                "w-full h-12",
                collapsed ? "justify-center" : "justify-start",
                isActive && "bg-accent",
            )}
        >
            <Link href={href}>
                <div className={cn(
                    "flex items-center w-full gap-x-4",
                    collapsed && "justify-center",
                )}>
                    <UserAvatar
                        imageURL={imageURL}
                        username={username}
                        isLive={true}
                    />
                    {!collapsed && (
                        <p className="truncate">{username}</p>
                    )}
                    {!collapsed && isLive && (
                        <LiveBadge className="ml-auto" />
                    )}
                </div>
            </Link>
        </Button>
    )
}