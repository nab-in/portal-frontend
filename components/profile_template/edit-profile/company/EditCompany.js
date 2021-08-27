import { useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import { API } from "../../../api"
import { useAlertsDispatch } from "../../../../context/alerts"
import Input from "../../../inputs/Input"
import Button from "../../../buttons/FormButton"
import Upload from "../Upload"
import styles from "../edit_profile.module.sass"

const EditProfile = ({ details, setDetails, page }) => {
  let [formData, setFormData] = useState({
    name: details?.name ? details.name : "",
    title: details.title ? details.title : "",
    bio: details.bio ? details.bio : "",
    location: details.location ? details.location : "",
    website: details.website ? details.website : "",
  })
  const [loading, setloading] = useState(false)
  const dispatch = useAlertsDispatch()
  let { name, title, bio, location, website } = formData
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault(e)
    setloading(true)
    axios
      .put(`${API}/companies/${details?.id}`, formData, config)
      .then((res) => {
        setDetails(res.data.payload)
        dispatch({
          type: "ADD",
          payload: {
            type: "success",
            message: "Details updated successfully",
          },
        })
        setloading(false)
      })
      .catch((err) => {
        if (err?.response) {
          dispatch({
            type: "ADD",
            payload: {
              type: "danger",
              message: err?.response.data?.message,
            },
          })
        }
        setloading(false)
      })
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
          page={page}
          details={details}
          setDetails={setDetails}
        />
        <article className={styles.contents}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              title="Name"
              name="name"
              id="name"
              value={name}
              handleChange={handleChange}
              placeholder="Enter your Last name"
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
              title="About"
              name="bio"
              id="bio"
              value={bio}
              placeholder="Bio"
              handleChange={handleChange}
              textarea={true}
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
              type="url"
              title="Website"
              name="website"
              id="website"
              value={website}
              handleChange={handleChange}
              placeholder="http://..."
            />
            <Button text="Save" btnClass="btn-primary" loading={loading} />
          </form>
        </article>
      </section>
    </div>
  )
}

export default EditProfile
