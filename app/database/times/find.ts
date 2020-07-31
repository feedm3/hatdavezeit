import { PrismaClient } from '@prisma/client';
import { Time } from '../../../pages/api/times';

export const findTimes = async (
  prisma: PrismaClient,
  from: Date,
): Promise<Time[]> => {
  return prisma.times
    .findMany({
      orderBy: {
        fromTime: 'asc',
      },
      where: {
        OR: [
          {
            fromTime: {
              gte: from.toISOString(),
            },
          },
          {
            toTime: {
              gte: from.toISOString(),
            },
          },
        ],
      },
    })
    .finally(() => {
      prisma.disconnect();
    });
};
