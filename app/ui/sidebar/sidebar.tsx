import { cn } from "@/lib/utils"
import { SideBarStore } from "@/store/use-sidebar"
import { Wrapper } from "./wrapper"
import { Toggle } from "./toggle"
import { Recommended } from "./recommended"
import { getRecommended } from "@/lib/recommended-services"
import { RecommendedSkeleton } from "../skeletons"
import { getFollowedUsers } from "@/lib/follow-service"
import { Following } from "./following"


export const Sidebar = async () => {
    const recommended = await getRecommended()
    const follows = await getFollowedUsers();


    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Following data={follows} />
                <Recommended data={recommended} />
            </div>
        </Wrapper>
    )
}