import React from "react"
import { useRouter } from "next/router"
import "../styles/globals.sass"
import Layout from "../components/layout/Layout"
import { AuthProvider } from "../context/auth"
import { AlertsProvider } from "../context/alerts"
import Alert from "../components/alerts/GlobalAlert"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const Site = () => {
    if (
      router.pathname.startsWith("/register") ||
      router.pathname.startsWith("/login") ||
      router.pathname.startsWith("/forgot_password")
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
  return (
    <AuthProvider>
      <AlertsProvider>
        <Site />
        <Alert />
      </AlertsProvider>
    </AuthProvider>
  )
}

export default MyApp
