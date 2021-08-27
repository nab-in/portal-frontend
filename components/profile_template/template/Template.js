import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useAuthState } from "../../../context/auth"
import Aside from "../aside/Aside"
import Details from "../Details"
import styles from "./template.module.sass"
import { API } from "../../api"

const Template = ({ page, details, setDetails }) => {
  let router = useRouter()
  let [isUser, setUser] = useState(false)
  let [isCompany, setCompany] = useState(false)
  let [loading, setLoading] = useState(false)
  let tab = router.query.tab
  const { user } = useAuthState()

  useEffect(() => {
    if (page == "company" || page == "auth-company") setLoading(true)
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    if (page == "company")
      axios
        .get(`${API}/users/belongstocompany?company=${router.query.id}`, config)
        .then((res) => {
          setLoading(false)
          if (page == "company") setCompany(res.data)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err.message)
        })
  }, [])
  useEffect(() => {
    if (page == "auth-user") {
      setUser(true)
    }
    if (page == "user" && user?.id == details.id) {
      setUser(true)
    }
  }, [])
  return (
    <section className={styles.template}>
      {loading ? (
        <></>
      ) : (
        <>
          <Aside
            page={page}
            details={details}
            tab={tab}
            isCompany={isCompany}
            isUser={isUser}
          />
          <div className={styles.main__details}>
            <Details
              page={page}
              details={details}
              tab={tab}
              isCompany={isCompany}
              isUser={isUser}
              setDetails={setDetails}
            />
          </div>
        </>
      )}
    </section>
  )
}

export default Template
