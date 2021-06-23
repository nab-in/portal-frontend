import React, { useEffect, useState } from "react"
import Link from "next/link"
import Loader from "../loaders/AuthLoader"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import FooterLoggedIn from "../footer/FooterLoggedIn"
import { useAuthState } from "../../context/auth"

const Layout = ({ children }) => {
  let [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuthState()
  
  return (
    <div className="layout">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          {children}
          { !isAuthenticated ? <Footer /> : <FooterLoggedIn />}
        </>
      )}
    </div>
  )
}

export default Layout
