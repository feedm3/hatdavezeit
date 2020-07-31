import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { isAfter, isBefore } from 'date-fns';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const now = new Date();
  const nowIso = now.toISOString();

  const times = await prisma.times.findMany({
    orderBy: {
      fromTime: 'desc',
    },
    where: {
      OR: [
        {
          fromTime: {
            gte: nowIso,
          },
        },
        {
          toTime: {
            gte: nowIso,
          },
        },
      ],
    },
  });

  const nowTimes = times.filter((time) => {
    return (
      isBefore(new Date(time.fromTime), now) &&
      isAfter(new Date(time.toTime), now)
    );
  });

  res.statusCode = 200;
  res.json(JSON.stringify(nowTimes));
};
