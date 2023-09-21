import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Container from "@/components/Container";
import VideoSearch from "@/components/VideoSearch";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import Social from "@/components/Social";
import FeatureCard from "@/components/FeatureCard";
import VideoDownloadList from "@/components/VideoDownloadList";
import useRequestVideo from "@/hooks/useRequestVideo";
import { getSupportedDownloaders } from "@/utils";
import Loader from "@/components/Loader";
import VideoDownloadError from "@/components/VideoDownloadError";

const socials = [
  { icon: <FaFacebook />, text: "Facebook" },
  { icon: <FaYoutube />, text: "Youtube" },
  { icon: <FaLinkedin />, text: "LinkedIn" },
  { icon: <FaInstagram />, text: "Instagram" },
];

const featuresData = [
  {
    title: "Multiple video formats and quality",
    description:
      "We support downloading video in different formats of your choice such as mp4, webm and different qualities like 360p, 720p and so on.",
  },
  {
    title: "Security and data protection",
    description:
      "SaveVideo will not save your video data, user data or any personal information on its servers",
  },
  {
    title: "Accessible for free",
    description:
      "No need for a paid subscription, our video downloader is free and will remain so",
  },
  {
    title: "Multiple websites supported",
    description:
      "We support downloading videos from a variety of websites such as Facebook, Twitter, Youtube...",
  },
];

export default function Home() {
  const { sendRequest, isLoading, error, data } = useRequestVideo();

  const handleSubmit = async (url: string) => {
    await sendRequest("", url);
  };

  return (
    <>
      {/* ... (rest of your component code) */}
      <section className={styles["feature"]}>
        <Container>
          <header className={styles["header"]}>
            <h4 className={styles["feature-subtitle"]}>Core Features</h4>
            <h2 className={styles["feature-title"]}>What makes our services exceptional from others</h2>
          </header>
          <div className={styles["cards"]}>
            {featuresData.map((feature, index) => (
              <div className={styles["card-wrapper"]} key={index}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const downloaders = await getSupportedDownloaders();
  return {
    props: {
      downloaders,
    },
    revalidate: 60 * 60,
  };
};
