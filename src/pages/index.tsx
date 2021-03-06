import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from "../components/ChallengeBox";

import Head from 'next/head';
import { CountdownProvider } from "../contexts/CountdownContext";
import { GetServerSideProps } from "next";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  totalExperience: number;
}

export default function Home(props: HomeProps) {
  

  return (
    <ChallengesProvider
      level={props.level} 
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      totalExperience={props.totalExperience}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | X-work</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div className={styles.left}>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div className={styles.right}>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted, totalExperience } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      totalExperience: Number(totalExperience)
    }
  }
}