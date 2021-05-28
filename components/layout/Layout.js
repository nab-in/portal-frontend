import React from "react";
import Loader from "../loaders/AuthLoader";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import FooterLoggedIn from "../footer/FooterLoggedIn";
import { useAuthState } from "../../context/auth";

let loading = false;
// console.log(useAuthState);

const Layout = ({ children }) => {
  const { user } = useAuthState();
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
  );
};

export default Layout;
