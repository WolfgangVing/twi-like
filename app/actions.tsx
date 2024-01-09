"use client";

import { useTransition } from "react";
import { Button } from "../components/ui/button"
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";

type ActionsProps = {
    isFollowing: boolean,
    userId: string
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
    const [isPending, startTransition] = useTransition();


    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You have unfollowed the user ${data.following.username}`))
                .catch(() => toast.error("Somethign went wrong"));
        });
    };

    const onClick = () => {
        if (isFollowing) {
            handleUnFollow()
        } else {
            handleFollow()
        }
    }
    return (
        <Button
            disabled={isPending}
            variant={"primary"}
            onClick={onClick}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}