import React from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./companies.module.sass"
let companies = [
  {
    id: 1,
    logo: "logo1.png",
    name: "Company Name",
    jobs: 18,
  },
  {
    id: 2,
    logo: "logo2.png",
    name: "coworker",
    jobs: 1,
  },
  {
    id: 3,
    logo: "logo1.png",
    name: "Company Name",
    jobs: 19,
  },
  {
    id: 4,
    logo: "logo2.png",
    name: "coworker",
    jobs: 10,
  },
  {
    id: 5,
    logo: "logo1.png",
    name: "Company Name",
    jobs: 3,
  },
  {
    id: 6,
    logo: "logo2.png",
    name: "coworker",
    jobs: 4,
  },
]

const Companies = () => {
  return (
    <section className={styles.companies}>
      <div className={`${styles.container} container`}>
        <h2 className="primary__header">Trusted By</h2>
        <div className={`${styles.showcase}`}>
          {companies.map(({ logo, name, id, jobs }) => (
            <article key={id}>
              <div className={`${styles.logo__container}`}>
                <Image
                  src={`/assets/companies/${logo}`}
                  alt={`${name} logo`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <Link href={`/companies/${name}`}>
                <a>View {jobs} Jobs</a>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Companies
