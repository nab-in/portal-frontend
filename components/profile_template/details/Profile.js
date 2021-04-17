import React from "react"
import styles from "./profile.module.sass"

let Card = ({ title, content, url }) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <p>{url ? <a href={content}>{content}</a> : ` ${content} `}</p>
  </div>
)

const Profile = ({ details }) => {
  let { id, title, bio, about, website, cv, location } = details
  return (
    <div className={styles.profile}>
      <section>
        <header className={styles.header}>
          <h2>About</h2>
        </header>
        <article className={styles.contents}>
          {title && <Card title="Title" content={title} />}
          {bio && <Card title="Bio" content={bio} />}
          {location && <Card title="Location" content={location} />}
          {about && <Card title="About" content={about} />}
          {website && <Card title="Website" content={website} url={true} />}
          {cv && <Card title="CV" content={cv} url="true" />}
        </article>
      </section>
    </div>
  )
}

export default Profile
