import Head from "next/head"
import Hero from "../components/home/hero/Hero"
import Companies from "../components/home/companies/Companies"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Job Portal App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <main>
        <Companies />
      </main>
    </div>
  )
}
