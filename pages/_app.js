import React from "react"
import { useRouter } from "next/router"
import "../styles/globals.sass"
import Layout from "../components/layout/Layout"
import { AuthProvider } from "../context/auth"
import { AlertsProvider } from "../context/alerts"
import Alert from "../components/alerts/GlobalAlert"
import Cookies from "js-cookie"
import { API } from "../components/api"

const MyApp = ({ data, Component, pageProps }) => {
  console.log(data)
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

let token = Cookies.get("token")

let config = {
  headers: {
    "Content-Type": "application/json",
    authorization: token,
  }
}

MyApp.getInitialProps = async () => {
  const res = await fetch(`${API}/me`, config)   
  const data = res.json()
  return {
     data,
  }
}

export default MyApp
