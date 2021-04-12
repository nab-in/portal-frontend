import Head from "next/head"
import Hero from "../components/hero/Hero"

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Job Portal App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </div>
  )
}
