import React from "react"
import Loader from "../loaders/AuthLoader"
import Header from "../header/Header"
import Footer from "../footer/Footer"

let loading = true

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {loading? <Loader />: <>
        <Header />
      {children}
      <Footer />
      </>}
    </div>
  )
}

export default Layout
