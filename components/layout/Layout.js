import Loader from "../loaders/AuthLoader"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import AuthFooter from "../footer/AuthFooter"
import { useAuthState } from "../../context/auth"

const Layout = ({ loading, children }) => {
  const { isAuthenticated } = useAuthState()

  return (
    <div className="layout">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          {children}
          {!isAuthenticated ? <Footer /> : <AuthFooter />}
        </>
      )}
    </div>
  )
}

export default Layout
