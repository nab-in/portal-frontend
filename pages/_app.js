import React from "react"
import { useRouter } from "next/router"
import "../styles/globals.sass"
import Layout from "../components/layout/Layout"
import { AuthProvider } from "../context/auth"
import { AlertsProvider } from "../context/alerts"
import Alert from "../components/alerts/GlobalAlert"
import Cookies from "js-cookie"
import { API } from "../components/api"
import axios from "axios"

const MyApp = ({ Component, pageProps }) => {
  // console.log(data)
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

// MyApp.getInitialProps = async (ctx) => {
//   // let token = Cookies.get("token")
//   // const res = await fetch(`${API}/me`)
//   // const json = a
//   return {
//     data: {
//       // token,
//       ctx,
//     },
//   }
// }

export default MyApp
