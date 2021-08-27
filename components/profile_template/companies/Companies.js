import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Link from "next/link"
import Section from "../Section"
import Company from "../../company/Company"
import { API } from "../../api"
import { config } from "../../config"

const Companies = () => {
  let router = useRouter()
  let [companies, setCompanies] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/me?fields=companies`, config)
      .then((res) => {
        // console.log(res)
        setCompanies(res.data.companies)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  // add them in a global state
  // console.log(companies)
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
