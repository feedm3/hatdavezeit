import { TimesResponse } from './api/times';
import styled from 'styled-components';
import { TimeEntryForm } from '../app/components/time-entry-form';
import { createTime, fetchTimes } from '../app/api/times';
import { TimesTable } from '../app/components/times-table';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const Page = styled.div`
  padding: 0 8px 32px 8px;
`;

const Title = styled.h1``;

const SubTitle = styled.h2`
  margin-top: 48px;
  margin-bottom: 16px;
`;

export default function Done(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  return (
    <Page>
      <Title>Done Panel 🍺</Title>
      <SubTitle>Add new time:</SubTitle>
      <TimeEntryForm
        onSave={(time) => {
          createTime(time).then(() => window.location.reload());
        }}
      />
      <SubTitle>Your times:</SubTitle>
      <TimesTable times={props.times} />
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps<{
  times: TimesResponse;
}> = async () => {
  const times = await fetchTimes();

  return {
    props: {
      times,
    },
  };
};
