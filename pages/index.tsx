import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { TimesResponse } from './api/times';
import { fetchTimes } from '../app/api/times';
import styled, { createGlobalStyle } from 'styled-components';

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
        <meta name="description" content={props.message} />
      </Head>
      <GlobalStyle />
      <Page>
        <div>
          <Title>{props.message}</Title>
          {props.hasTime && (
            <p>
              jetzt gerade am liebsten für{' '}
              {props.times.now.map((time) => time.title).join(', ')}
            </p>
          )}
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
  message: string;
  hasTime: boolean;
}> = async () => {
  const times = await fetchTimes();
  const hasTime = Boolean(Array.isArray(times.now) && times.now.length > 0);
  const message = hasTime ? getRandom(YES) : getRandom(NOS);

  return {
    props: {
      times,
      message,
      hasTime,
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
