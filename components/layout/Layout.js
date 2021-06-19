import React, { useEffect, useState } from "react"
import Link from "next/link"
import Loader from "../loaders/AuthLoader"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import FooterLoggedIn from "../footer/FooterLoggedIn"
import { useAuthDispatch, useAuthState } from "../../context/auth"
import { useAlertsDispatch } from "../../context/alerts"
import Cookies from "js-cookie"
import { API } from "../api"
import axios from "axios"

const Layout = ({ data, children }) => {
  let [loading, setLoading] = useState(true)
  const { user } = useAuthState()
  const dispatch = useAuthDispatch()
  const alertDisptach = useAlertsDispatch()
  useEffect(() => {
    let token = Cookies.get("token")
    if (token)
      dispatch({
        type: "AUTH",
      })
    if (token && data) {
      dispatch({
        type: "AUTH",
        payload: data,
      })
      setLoading(false)
    }

    if (token && !data)
      alertDisptach({
        type: "ADD",
        payload: {
          message: (
            <>
              Failed to fetch your profile info please{" "}
              <Link href="/login">Login</Link> or refresh the page
            </>
          ),
          type: "danger",
        },
      })

    setLoading(false)
  }, [data])
  return (
    <div className="layout">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          {children}
          {!user ? <Footer /> : <FooterLoggedIn />}
        </>
      )}
    </div>
  )
}

Layout.getInitialProps = async (ctx) => {
  let token = Cookies.get("token")
  const res = await fetch(`${API}/me`)
  const json = await res.json()
  return {
    data: {
      token,
      ctx,
    },
  }
}

export default Layout
