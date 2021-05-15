import React, { useState } from "react"
import Input from "../../inputs/Input"
import Button from "../../buttons/FormButton"
import Upload from "./Upload"
import styles from "./edit_profile.module.sass"

let isUser = false
const EditProfile = ({ page, details }) => {
  // let [cv, setCv] = useState(details.cv ? details.cv : "")
  let [formData, setFormData] = useState({
    firstname: details.name ? details.name : "",
    title: details.title ? details.title : "",
    bio: details.bio ? details.bio : "",
    location: details.location ? details.location : "",
    about: details.about ? details.about : "",
    website: details.website ? details.website : "",
  })
  let { Name, title, bio, location, about, website } = formData
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault(e)
  }
  const handleFileChange = (e) => {}
  const handleFileSubmit = (e) => {
    e.preventDefault(e)
  }
  return (
    <div className={styles.profile}>
      <section>
        <header>
          <h2>Edit Informations</h2>
        </header>
        <Upload
          dp={details.dp ? details.dp : details.logo}
          name={details.username ? details.username : details.name}
        />
        <article className={styles.contents}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              title="Name"
              name="Name"
              id="name"
              value={Name}
              handleChange={handleChange}
              placeholder="Enter your name"
            />
            <Input
              title="Title"
              name="title"
              id="title"
              value={title}
              handleChange={handleChange}
              placeholder="Title..."
            />
            <Input
              title="Bio"
              name="bio"
              id="bio"
              value={bio}
              placeholder="Bio"
              handleChange={handleChange}
            />
            <Input
              title="Location"
              name="location"
              id="location"
              value={location}
              handleChange={handleChange}
              placeholder="Location"
            />
            <Input
              title="About"
              name="about"
              id="about"
              value={about}
              handleChange={handleChange}
              placeholder="About"
              textarea={true}
            />
            <Input
              title="Website"
              name="website"
              id="website"
              value={website}
              handleChange={handleChange}
              placeholder="http://..."
            />
            <Button text="Save" btnClass="btn-primary" />
          </form>
        </article>
      </section>
      {isUser && (
        <section>
          <header>
            <h2>Upload CV</h2>
          </header>
          <article className={styles.contents}>
            <form onSubmit={(e) => handleFileSubmit(e)}>
              <input
                type="file"
                name="cv"
                id="cv"
                handleChange={(e) => handleFileChange(e)}
              />
              <label htmlFor="cv">Upload</label>
              <Button text="Upload" btnClass="btn-primary" />
            </form>
          </article>
        </section>
      )}
      <section>
        <header>
          <h2>Settings</h2>
        </header>
        <article className={styles.contents}>Just settings</article>
      </section>
    </div>
  )
}

export default EditProfile
