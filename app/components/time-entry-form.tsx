import React, { useState } from 'react';
import { addHours } from 'date-fns';
import Flatpickr from 'react-flatpickr';
import { CreateTimeItem } from '../api/times';
import styled from 'styled-components';

const SaveButton = styled.button`
  padding: 8px;
  width: 100%;
`;

interface TimeEntryFormProps {
  onSave: (timeEntry: CreateTimeItem) => void;
}

export const TimeEntryForm: React.FC<TimeEntryFormProps> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [fromTime, setFromTime] = useState<Date>(new Date());
  const [toTime, setToTime] = useState<Date>(addHours(new Date(), 4));

  const resetState = () => {
    setTitle('');
    setFromTime(new Date());
    setToTime(addHours(new Date(), 4));
  };

  const isDisabled = () => {
    return !title || !fromTime || !toTime;
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Title:</td>
            <td>
              <input
                placeholder={'Something like "CoD"'}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>From:</td>
            <td>
              {' '}
              <Flatpickr
                options={{
                  enableTime: true,
                  time_24hr: true,
                  minDate: 'today',
                  dateFormat: 'd.m.y H:i',
                }}
                value={fromTime}
                onChange={(date) => {
                  if (Array.isArray(date)) {
                    setFromTime(date[0]);
                  } else {
                    setFromTime(date);
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <td>To:</td>
            <td>
              <Flatpickr
                options={{
                  enableTime: true,
                  time_24hr: true,
                  minDate: 'today',
                  dateFormat: 'd.m.y H:i',
                }}
                value={toTime}
                onChange={(date) => {
                  if (Array.isArray(date)) {
                    setToTime(date[0]);
                  } else {
                    setToTime(date);
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <SaveButton
                disabled={isDisabled()}
                title={
                  isDisabled() ? 'Please fill in all fields' : 'Click to save'
                }
                onClick={() => {
                  props.onSave({
                    title,
                    fromTime,
                    toTime,
                  });

                  resetState();
                }}
              >
                save
              </SaveButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
