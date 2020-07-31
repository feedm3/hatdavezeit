import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { TimesResponse } from './api/times';
import { fetchTimes } from '../app/api/times';
import styled, { createGlobalStyle } from 'styled-components';
import { addHours, format, isToday } from 'date-fns';

const GlobalStyle = createGlobalStyle`
  html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div,
      div#__next > div > div {
        height: 100%;
      }
`;

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 32px;
`;

const Footer = styled.footer`
  font-size: 12px;
  margin: 16px;
  padding: 0;
`;

const UnstyledLink = styled.a`
  text-decoration: none;
  color: #717171;
`;

export default function Home(
  props: InferGetServerSidePropsType<typeof getStaticProps>,
) {
  return (
    <>
      <Head>
        <title>Hat Dave Zeit?</title>
        <meta name="description" content={props.title} />
      </Head>
      <GlobalStyle />
      <Page>
        <div>
          <Title>{props.title}</Title>
          {props.subTitle && <p>{props.subTitle}</p>}
        </div>
        <Footer>
          <UnstyledLink
            href="https://github.com/feedm3"
            target="_blank"
            rel="noopener"
          >
            Made with ❤️ from feedm3
          </UnstyledLink>
        </Footer>
      </Page>
    </>
  );
}

export const getStaticProps: GetServerSideProps<{
  times: TimesResponse;
  title: string;
  subTitle: string;
}> = async () => {
  const times = await fetchTimes();
  const hasNowTime = Boolean(Array.isArray(times.now) && times.now.length > 0);
  const hasNextTime = Boolean(times.next);

  const title = hasNowTime ? getRandom(YES) : getRandom(NOS);

  const subTitle = hasNowTime
    ? `jetzt gerade am liebsten für ${times.now
        .map((time) => time.title)
        .join(', ')}`
    : hasNextTime
    ? isToday(new Date(times.next.fromTime))
      ? `eventuell heute um ${format(
          process.env.NODE_ENV === 'production'
            ? addHours(new Date(times.next.fromTime), 2) // vercel server is not using german timezone
            : new Date(times.next.fromTime),
          'HH:mm',
        )} Uhr`
      : 'heute nicht mehr'
    : '';

  return {
    props: {
      times,
      title,
      subTitle,
    },
    revalidate: 1,
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
