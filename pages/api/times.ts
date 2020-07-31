import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, times as Times } from '@prisma/client';
import { addHours, isAfter, isBefore } from 'date-fns';
import { createTime } from '../../app/database/times/create';
import { findTimes } from '../../app/database/times/find';
import { deleteTime } from '../../app/database/times/delete';

const prisma = new PrismaClient();

// to have a nicer name, initial name comes from the database table name
export type Time = Times;

export interface TimesResponse {
  all: Time[];
  now: Time[];
  next: Time;
}

interface ErrorResponse {
  message: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<TimesResponse | ErrorResponse>,
) => {
  console.log('times: received request...');
  prisma.connect();

  if (req.method === 'POST') {
    console.log('times: creating new time entry...');
    await createTime(prisma, {
      title: req.body.title,
      fromTime: req.body.fromTime,
      toTime: req.body.toTime,
    });
    console.log('times: time entry created');
    res.status(200).json({ message: 'success' });
    return;
  }

  if (req.method === 'DELETE') {
    console.log('times: delete time entry with id: ', req.body.id);
    if (!req.body.id) {
      console.error('times: delete failed, no id given!');
      res.status(400).json({ message: 'id undefined' });
      return;
    }
    console.log('times: deleting...');
    await deleteTime(prisma, req.body.id);
    console.log('times: deleting successful');
    res.status(200).json({ message: 'success' });
    return;
  }

  // the new date will return the utc date, thats why we have to add 2 hours
  // to be in cte time
  const now = addHours(new Date(), 2);

  const nowAndFutureTimes = await findTimes(prisma, now);

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

  res.status(200).json({
    now: nowTimes,
    next: nextTime,
    all: nowAndFutureTimes,
  });
};
