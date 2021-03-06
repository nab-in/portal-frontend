import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../config"
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
    if (!user && page === "company") setCompany(false)
  }, [user])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (page == "company" || page == "auth-company") setLoading(true)
      if (page == "company")
        axios
          .get(
            `${API}/users/belongstocompany?company=${router.query.id}`,
            config
          )
          .then((res) => {
            setLoading(false)
            if (page == "company") setCompany(res.data?.message)
          })
          .catch((err) => {
            setLoading(false)
            console.log(err?.response)
          })
    }
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (page == "auth-user") {
        setUser(true)
      }
      if (page == "user" && user?.id == details.id) {
        setUser(true)
      }
    }
    return () => {
      isMounted = false
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
