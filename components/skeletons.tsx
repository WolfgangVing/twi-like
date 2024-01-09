import { avatarSizes } from "@/app/ui/user-avatar";
import { VariantProps } from "class-variance-authority";

type UserAvatarSkeleton = {} & VariantProps<typeof avatarSizes>;