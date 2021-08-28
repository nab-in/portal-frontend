import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import "../styles/globals.sass"
import Layout from "../components/layout/Layout"
import { AuthProvider, useAuthDispatch, useAuthState } from "../context/auth"
import { AlertsProvider } from "../context/alerts"
import Alert from "../components/alerts/GlobalAlert"
import { API } from "../components/api"
import { config } from "../components/config"
import axios from "axios"
import "swiper/css"

const MyApp = ({ Component, pageProps }) => {
  const Site = () => {
    const dispatch = useAuthDispatch()
    const { user, loading } = useAuthState()
    const router = useRouter()
    useEffect(() => {
      let isMounted = true
      if (isMounted)
        if (!user) {
          axios
            .get(
              `${API}/me?fields=email,firstname,lastname,username,bio,title,location,id,websitelink,cv,cvlink,verified,enabled,dp,userRoles,companies`,
              config
            )
            .then((res) => {
              let data = res.data
              if (data?.companies)
                dispatch({
                  type: "COMPANIES",
                  payload: data.companies,
                })
              if (data?.userRoles)
                dispatch({
                  type: "USERROLES",
                  payload: data.userRoles,
                })
              delete data?.companies
              delete data?.userRoles
              dispatch({
                type: "AUTH",
                payload: data,
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      return () => {
        isMounted = false
      }
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
