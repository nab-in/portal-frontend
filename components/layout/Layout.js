import React from "react"
import { withIronSession } from "next-iron-session"
import Header from "../header/Header"
import Footer from "../footer/Footer"

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    console.log(req.session)
    // const user = req.session.get("user")

    // if (user === undefined) {
    //   // res.setHeader("location", "/login")
    //   res.statusCode = 302
    //   res.end()
    //   return { props: {} }
    // }

    return {
      props: {
        // user: req.session.get("user")
      },
    }
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: "ksdhkjkljsdldj",
  }
)

export default Layout
