import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { TimesResponse } from './api/times';
import { fetchTimes } from '../app/api/times';

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const message = props.times.now ? getRandom(YES) : getRandom(NOS);

  return (
    <>
      <Head>
        <title>Hat Dave Zeit?</title>
        <meta name="description" content={message} />
      </Head>
      <h1 style={{ display: 'grid', placeItems: 'center' }}>{message}</h1>
    </>
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

const NOS = [
  'nein! 🤬',
  'grade leider nicht, aber bestimmt bald 🤷',
  'sorry, nicht jetzt 👾',
  'koi zeit 👎',
  'koi zeit, algodat 👨‍💻',
  'als ob... 💩',
];

const YES = [
  'klar 🥳',
  'ich hab immer Zeit 😚',
  'sichi 😎',
  'endlich fragt mal jemand, klar hab ich Zeit 😏',
  'ja freile 👌',
];

const getRandom = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};
