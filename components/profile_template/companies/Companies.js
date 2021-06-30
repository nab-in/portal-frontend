import { useRouter } from "next/router"
import Link from "next/link"
import Section from "../Section"

const Companies = () => {
  let router = useRouter()
  console.log(router)
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
