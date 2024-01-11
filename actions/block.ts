import { blockUser, unblockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  // [ ]: Adapt to disconnect form livestream
  // [ ]: Allow ability to kick the guest

  const blockedUser = await blockUser(id);

  if (blockedUser) { 
    revalidatePath(`/${blockedUser.blocked.username}`);
  };

  return blockedUser;
}

export const onUnblock = async (id: string) => {
  const blockedUser = await unblockUser(id);

  if (blockedUser) { 
    revalidatePath(`/${blockedUser.blocked.username}`);
  };

  return blockedUser;
}