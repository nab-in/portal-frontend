import Head from "next/head"
import Hero from "../components/home/hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
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
        <Jobs heading="Recent Jobs" />
        <Companies />
      </main>
    </div>
  )
}

// export async function getStaticProps() {
//   let jobs = null

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })

//   return {
//     props: {
//       jobs,
//     },
//   }
// }
