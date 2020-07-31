import { PrismaClient } from '@prisma/client';

export const deleteTime = async (
  prisma: PrismaClient,
  id: number,
): Promise<void> => {
  await prisma.times
    .delete({
      where: {
        id: id,
      },
    })
    .finally(() => prisma.disconnect());
};
