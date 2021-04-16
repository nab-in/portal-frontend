import React from "react"
// import { Provider } from "react-redux"
import { useRouter } from "next/router"
import "../styles/globals.sass"
import Layout from "../components/layout/Layout"
// import store from "../redux/store"

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
    // <Provider store={store}>
    <Site />
    // </Provider>
  )
}

export default MyApp
