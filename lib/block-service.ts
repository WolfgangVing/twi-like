import { db } from "./db";

import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found!");
    };

    if (otherUser.id === self.id) {
      return false;
    };

    const isBlocked = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });

    return !!isBlocked;
  } catch (error) {
    return false
  }
}

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot block yourself");
  };

  const targetUser = await db.user.findUnique({
    where: { id },
  });

  if (!targetUser) {
    throw new Error("User not found");
  };

  const existingBLock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: targetUser.id
      },
    },
  });

  if (existingBLock) {
    throw new Error("Already blocked!");
  };

  const block = await db.block.create({
    data: {
      blockedId: self.id,
      blockerId: targetUser.id
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const unblockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot block yourself!");
  };

  const targetUser = await db.user.findUnique({
    where: { id },
  });

  if (!targetUser) {
    throw new Error("User not found")
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: targetUser.id,
        blockerId: self.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("Not blocked");
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id
    },
    include: {
      blocked: true,
    },
  });

  return unblock;
}