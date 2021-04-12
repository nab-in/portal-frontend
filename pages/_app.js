import React, { lazy } from "react"
import "../styles/globals.sass"
import Layout from "../components/layout/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp


// /pages/_app_.js
// import React from 'react'
// import App from 'next/app'
// import SiteLayout from '../components/SiteLayout'
// import AccountSettingsLayout from '../components/AccountSettingsLayout'

// class MyApp extends App {
//   render() {
//     const { Component, pageProps, router } = this.props

//     if (router.pathname.startsWith('/account-settings/')) {
//       return (
//         <SiteLayout>
//           <AccountSettingsLayout>
//             <Component {...pageProps}></Component>
//           </AccountSettingsLayout>
//         </SiteLayout>
//       )
//     }

//     return (
//       <SiteLayout>
//         <Component {...pageProps}></Component>
//       </SiteLayout>
//     )
//   }
// }

// export default MyApp
