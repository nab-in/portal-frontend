import Head from "next/head"
import styles from "../styles/Home.module.sass"

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Job Portal App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to job portal</h1>
    </div>
  )
}
