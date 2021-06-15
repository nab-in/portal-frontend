import React, { useEffect, useState } from "react"
import Loader from "../loaders/AuthLoader"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import FooterLoggedIn from "../footer/FooterLoggedIn"
import { useAuthDispatch, useAuthState } from "../../context/auth"
import { useAlertsDispatch } from "../../context/alerts"
import Cookies from "js-cookie"

const Layout = ({ children }) => {
  let [loading, setLoading] = useState(true)
  const { user } = useAuthState()
  const dispatch = useAuthDispatch()
  const alertDisptach = useAlertsDispatch()
  useEffect(() => {
    let token = Cookies.get("token")
    if (token) {
      dispatch({
        type: "AUTH",
      })
      setLoading(false)
    }
    if (!token) {
      setLoading(false)
    }
    if (!user)
      alertDisptach({
        type: "ADD",
        payload: {
          message: "Failed to fetch user info",
          type: "danger",
        },
      })
  }, [])
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

export default Layout
