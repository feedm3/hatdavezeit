import { Time, TimesResponse } from '../../pages/api/times';

const PATH =
  process.env.NODE_ENV === 'production'
    ? 'https://hatdavezeit.de/api/times'
    : 'http://localhost:3000/api/times';

export const fetchTimes = async (): Promise<TimesResponse> => {
  return fetch(PATH).then((response) => {
    return response.json();
  });
};

export interface CreateTimeItem {
  title: string;
  fromTime: Date;
  toTime: Date;
}

export const createTime = async (time: CreateTimeItem): Promise<void> => {
  console.log(time);
  return window
    .fetch(PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: time.title,
        fromTime: time.fromTime.toISOString(),
        toTime: time.toTime.toISOString(),
      }),
    })
    .then(() => {});
};

export const deleteTime = async (time: Time): Promise<void> => {
  return window
    .fetch(PATH, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: time.id,
      }),
    })
    .then(() => {});
};
