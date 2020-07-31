import { TimesResponse } from '../../pages/api/times';
import { deleteTime } from '../api/times';
import { format } from 'date-fns';
import styled from 'styled-components';

const TableContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
`;

const TableHeaderEntry = styled.th`
  padding: 4px 8px;
`;

const TableEntry = styled.td`
  padding: 8px;
  text-align: center;
  border: 1px solid black;
`;

const TableCaption = styled.div`
  color: grey;
  width: 100%;
  font-size: 14px;
  text-align: left;
  margin-top: 8px;
`;

interface TimesTableProps {
  times: TimesResponse;
}

export const TimesTable: React.FC<TimesTableProps> = (props) => {
  if (!props.times || !props.times.all || props.times.all.length === 0) {
    return (
      <div>
        There are no entered times. Looks like you are very busy Dave...
      </div>
    );
  }

  const extendedTimes = props.times.all.map((time) => {
    return {
      ...time,
      isNow: Boolean(
        props.times.now &&
          props.times.now.find((nowTime) => nowTime.id === time.id),
      ),
      isNext: Boolean(props.times.next && props.times.next.id === time.id),
    };
  });

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeaderEntry>Title</TableHeaderEntry>
            <TableHeaderEntry>From</TableHeaderEntry>
            <TableHeaderEntry>To</TableHeaderEntry>
            <TableHeaderEntry>Now</TableHeaderEntry>
            <TableHeaderEntry>Next</TableHeaderEntry>
            <TableHeaderEntry>Actions</TableHeaderEntry>
          </tr>
        </thead>
        <tbody>
          {extendedTimes.map((time) => {
            return (
              <tr key={time.id}>
                <TableEntry>{time.title}</TableEntry>
                <TableEntry>{formatDate(new Date(time.fromTime))}</TableEntry>
                <TableEntry>{formatDate(new Date(time.toTime))}</TableEntry>
                <TableEntry>{time.isNow ? '✅' : ''}</TableEntry>
                <TableEntry>{time.isNext ? '✅' : ''}</TableEntry>
                <TableEntry>
                  <button
                    onClick={() => {
                      deleteTime(time).then(() => {
                        window.location.reload();
                      });
                    }}
                  >
                    Delete
                  </button>
                </TableEntry>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <TableCaption>
        "Now" and "Next" are used on the index page to show if and when you have
        time
      </TableCaption>
    </TableContainer>
  );
};

const formatDate = (date: Date) => {
  return format(date, 'dd.MM.yyyy HH:mm');
};
