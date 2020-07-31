import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, times } from '@prisma/client';
import { addHours, isAfter, isBefore } from 'date-fns';

const prisma = new PrismaClient();

interface TimeResponse {
  now: times[];
  next: times;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<TimeResponse>,
) => {
  // the new date will return the utc date, thats why we have to add 2 hourse
  // to be in cte time
  const now = addHours(new Date(), 2);
  const nowIso = now.toISOString();

  const nowAndFutureTimes = await prisma.times.findMany({
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

  const nowTimes = nowAndFutureTimes.filter((time) => {
    return (
      isBefore(new Date(time.fromTime), now) &&
      isAfter(new Date(time.toTime), now)
    );
  });

  const nextTimes = nowAndFutureTimes
    .filter((time) => isAfter(new Date(time.fromTime), now))
    .sort(
      (timeA, timeB) =>
        new Date(timeA.fromTime).getTime() - new Date(timeB.fromTime).getTime(),
    );
  const nextTime = nextTimes.length > 0 ? nextTimes[0] : null;

  res.statusCode = 200;
  res.json({
    now: nowTimes,
    next: nextTime,
  });
};
