import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Link from "next/link"
import Section from "../Section"
import { API } from "../../api"
import Cookies from "js-cookie"

const Companies = () => {
  let router = useRouter()
  let [companies, setCompanies] = useState([])

  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    axios
      .get(`${API}/me?fields=companies`, config)
      .then((res) => {
        console.log(res)
        setCompanies(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  // add them in a global state
  console.log(companies)
  return (
    <div>
      <Section title="Your Companies">
        <article>
          <p>
            You belong to no company &nbsp;
            <Link href={`${router.route}?tab=add-company`}>
              <a>Add Company</a>
            </Link>
          </p>
        </article>
      </Section>
    </div>
  )
}

export default Companies
