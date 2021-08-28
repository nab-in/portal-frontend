import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Link from "next/link"
import Section from "../Section"
import Company from "../../company/Company"
import { API } from "../../api"
import { config } from "../../config"
import { useAuthState, useAuthDispatch } from "../../../context/auth"

const Companies = () => {
  let router = useRouter()
  const [errors, setErrors] = useState(null)
  const [message, setMessage] = useState("")
  const { companies } = useAuthState()
  const dispatch = useAuthDispatch()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (companies?.length === 0 && message != "No company found") {
        axios
          .get(`${API}/me?fields=companies`, config)
          .then((res) => {
            if (res.data?.companies?.length == 0) {
              console.log("message here")
              setMessage("No company found")
            } else {
              dispatch({
                type: "COMPANIES",
                payload: res.data.companies,
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div>
      <Section title="Your Companies">
        <article>
          {companies.length > 0 ? (
            <>
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
              {companies.map((company) => (
                <Company key={company.id} company={company} page="auth" />
              ))}
            </>
          ) : (
            <>
              <p>
                You belong to no company &nbsp;
                <Link href={`${router.route}?tab=add-company`}>
                  <a>Register a Company</a>
                </Link>
              </p>
            </>
          )}
        </article>
      </Section>
    </div>
  )
}

export default Companies
