import { cn } from "@/lib/utils"
import { SideBarStore } from "@/store/use-sidebar"
import { Wrapper } from "./wrapper"
import { Toggle } from "./toggle"
import { Recommended } from "./recommended"
import { getRecommended } from "@/lib/recommended-services"
import { RecommendedSkeleton } from "../skeletons"


export const Sidebar = async () => {
    const recommended = await getRecommended()


    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Recommended data={recommended} />
            </div>
        </Wrapper>
    )
}