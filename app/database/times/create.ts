import { PrismaClient } from '@prisma/client';
import { CreateTimeItem } from '../../api/times';

export const createTime = async (
  prisma: PrismaClient,
  createTimeItem: CreateTimeItem,
): Promise<void> => {
  return prisma.times
    .create({
      data: {
        title: createTimeItem.title,
        fromTime: createTimeItem.fromTime,
        toTime: createTimeItem.toTime,
      },
    })
    .then(() => {})
    .finally(() => prisma.disconnect());
};
