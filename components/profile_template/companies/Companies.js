import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { FaSync } from "react-icons/fa"
import Loader from "../../loaders/CardLoader"
import Link from "next/link"
import Section from "../Section"
import Company from "../../company/Company"
import { API } from "../../api"
import { config } from "../../config"
import { useAuthState, useAuthDispatch } from "../../../context/auth"

const Companies = () => {
  let router = useRouter()
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { companies } = useAuthState()
  const dispatch = useAuthDispatch()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (companies?.length === 0 && message != "No company found") {
        refreshCompanies()
      }
    }
    return () => {
      isMounted = false
    }
  }, [])

  const refreshCompanies = () => {
    setLoading(true)
    axios
      .get(`${API}/me?fields=companies`, config)
      .then((res) => {
        if (res.data?.companies?.length == 0) {
          setMessage("You don't belong to any company")
        } else {
          dispatch({
            type: "COMPANIES",
            payload: res.data.companies,
          })
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        if (err?.response) {
          setErrors({
            type: "danger",
            msg: err.response?.data?.message,
          })
        } else if (err?.message) {
          if (err?.code === "ECONNREFUSED") {
            setErrors({
              type: "danger",
              msg: "Failed to connect, please try again",
            })
          } else {
            setErrors({
              type: "danger",
              msg: err?.message,
            })
          }
        } else {
          setErrors({
            type: "danger",
            msg: "Internal server error, please refresh",
          })
        }
      })
  }

  return (
    <div>
      <Section title="Your Companies">
        <article>
          <p
            style={{
              textAlign: "right",
              marginBottom: "1rem",
            }}
          >
            <Link href={`${router.route}?tab=add-company`}>
              <a>Register a Company</a>
            </Link>
          </p>
          {loading ? (
            <>
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            <>
              {errors?.msg ? (
                <p className="alerts danger">{errors?.msg}</p>
              ) : (
                <>
                  {companies.length > 0 && (
                    <>
                      {companies.map((company) => (
                        <Company
                          key={company.id}
                          company={company}
                          page="auth"
                        />
                      ))}
                    </>
                  )}
                  {message?.length > 0 && !loading && <p>{message}</p>}
                  {(companies?.length === 0 || errors) && (
                    <div
                      style={{
                        width: "100%",
                        marginTop: "1rem",
                      }}
                    >
                      <button
                        onClick={refreshCompanies}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <FaSync
                          className={loading ? `spinner` : ``}
                          style={{
                            fontSize: "1.8rem",
                            color: "gray",
                          }}
                        />
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </article>
      </Section>
    </div>
  )
}

export default Companies
