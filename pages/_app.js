import React, { lazy } from "react"
import "../styles/globals.sass"
import Layout from "../components/layout/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
