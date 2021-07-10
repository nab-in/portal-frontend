import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import "../styles/globals.sass"
import Layout from "../components/layout/Layout"
import { AuthProvider, useAuthDispatch, useAuthState } from "../context/auth"
import { AlertsProvider } from "../context/alerts"
import Alert from "../components/alerts/GlobalAlert"
import Cookies from "js-cookie"
import { API } from "../components/api"
import axios from "axios"

const MyApp = ({ Component, pageProps }) => {
  const Site = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useAuthDispatch()
    const { user } = useAuthState()
    const router = useRouter()
    useEffect(() => {
      let token = Cookies.get("token")
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      }
      axios
        .get(`${API}/me`, config)
        .then((res) => {
          if (!user)
            dispatch({
              type: "AUTH",
              payload: res.data,
            })
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    }, [])
    if (
      router.pathname.startsWith("/register") ||
      router.pathname.startsWith("/login") ||
      router.pathname.startsWith("/forgot_password")
    ) {
      return <Component {...pageProps} />
    } else {
      return (
        <Layout loading={loading}>
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
