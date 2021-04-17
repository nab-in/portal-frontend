import React from "react"
import styles from "./profile.module.sass"

let Card = ({ title, content, url }) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <p>{url ? <a href={content}>{content}</a> : ` ${content} `}</p>
  </div>
)

const Profile = ({ page, details }) => {
  let { id, title, name, bio, about, website, cv, location } = details
  return (
    <div className={styles.profile}>
      <section>
        <div className={styles.header}>
          <h2>About</h2>
        </div>
        <div className={styles.contents}>
          {title && <Card title="Title" content={title} />}
          {bio && <Card title="Bio" content={bio} />}
          {location && <Card title="Location" content={location} />}
          {about && <Card title="About" content={about} />}
          {website && <Card title="Website" content={website} url={true} />}
          {cv && <Card title="CV" content={cv} url="true" />}
        </div>
      </section>
    </div>
  )
}

export default Profile
