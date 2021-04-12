import React from "react"
import { useRouter } from "next/router"
import "../styles/globals.sass"
import Layout from "../components/layout/Layout"

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  if (
    router.pathname.startsWith("/register") ||
    router.pathname.startsWith("/login")
  ) {
    return <Component {...pageProps} />
  } else {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp
