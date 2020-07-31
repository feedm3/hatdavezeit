import Flatpickr from 'react-flatpickr';
import { useEffect, useState } from 'react';
import { TimesResponse } from './api/times';

export default function Done() {
  const [title, setTitle] = useState<string>('');
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [times, setTimes] = useState<TimesResponse>();

  useEffect(() => {
    window
      .fetch('/api/times')
      .then((response) => {
        return response.json();
      })
      .then((times) => {
        setTimes(times);
      });
  });

  return (
    <div>
      <h1>done panel</h1>
      <h2>Add new time:</h2>
      <input placeholder={'Title'} />
      <p>
        From:{' '}
        <Flatpickr
          options={{
            enableTime: true,
            time_24hr: true,
            minDate: 'today',
            dateFormat: 'd.m.y H:i',
          }}
          value={fromDate}
          onChange={(date) => {
            setFromDate(date);
          }}
        />
      </p>
      <p>
        To:{' '}
        <Flatpickr
          options={{
            enableTime: true,
            time_24hr: true,
            minDate: 'today',
            dateFormat: 'd.m.y H:i',
          }}
          value={toDate}
          onChange={(date) => {
            setToDate(date);
          }}
        />
      </p>
      <button>save</button>
      <h2>Your times</h2>
      {times?.all?.length > 0 ? (
        times.all.map((time) => {
          return (
            <p key={time.id}>
              <span>{time.title}</span>
              <span>{time.fromTime}</span> - <span>{time.toTime}</span>
            </p>
          );
        })
      ) : (
        <div>nein</div>
      )}
    </div>
  );
}
