import { Skeleton } from "@/components/ui/skeleton"
import { VariantProps } from "class-variance-authority"
import { avatarSizes } from "./user-avatar"
import { cn } from "@/lib/utils"

export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, idx) => (
                <UserItemSkeleton key={idx} />
            ))}
        </ul>
    )
}

export const SideBarSkeleton = () => {
    return (
        <aside
            className="fixed left-0 flex flex-col w-[70px] 
            lg:w-60 h-full bg-background border-r border-[#2D2E35]
            z-50">
            <RecommendedSkeleton />
        </aside>
    )
}

// export const ToggleSkeleton = () => {
//     return (
//         <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
//             <Skeleton className="h-6 w-[100px] " />
//             <Skeleton className="h-6 w-6"/>
//         </div>
//     )
// }

export const UserItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
            <div className="flex-1">
                <Skeleton className="h-6"/>
            </div>
        </li>
    )
}

export type UserAvatarSkeletonProps = VariantProps<typeof avatarSizes>;

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    return (
        <Skeleton
            className={cn(
                "rounded-full", avatarSizes({ size })
            )}
        />
    )
}