
import { Actions } from "@/app/actions";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";

type UserPageProps = {
    params: {
        username: string;
    }
}

export default async function UserPage({ params }: UserPageProps) {
    const user = await getUserByUsername(params.username);

    if (!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);

    return (
        <div className="flex flex-col gap-y-4">
            <p>
                User: {user.username}
            </p>
            <p>
                User: {user.id}
            </p>
            <p>
                isFollowing: {`${isFollowing}`}
            </p>
            <Actions userId={user.id} isFollowing={isFollowing} />
        </div>
    )
}