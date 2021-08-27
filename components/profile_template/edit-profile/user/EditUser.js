import React, { useState } from "react"
import Section from "../../Section"
import Input from "../../../inputs/Input"
import Button from "../../../buttons/FormButton"
import Upload from "../Upload"
import styles from "../edit_profile.module.sass"
import Settings from "../settings/Settings"
import CV from "./CV"
import axios from "axios"
import { API } from "../../../api"
import Cookies from "js-cookie"
import { useAuthDispatch } from "../../../../context/auth"
import { useAlertsDispatch } from "../../../../context/alerts"

const EditProfile = ({ details, page }) => {
  let [loading, setLoading] = useState(false)
  let [formData, setFormData] = useState({
    firstname: details?.firstname ? details.firstname : "",
    lastname: details?.lastname ? details.lastname : "",
    title: details.title ? details.title : "",
    bio: details.bio ? details.bio : "",
    location: details.location ? details.location : "",
    about: details.about ? details.about : "",
    website: details.website ? details.website : "",
    websitelink: details?.websitelink ? details.websitelink : "",
    cvlink: details?.cvlink ? details.cvlink : "",
  })
  let {
    firstname,
    lastname,
    title,
    bio,
    location,
    about,
    websitelink,
    cvlink,
  } = formData

  const dispatch = useAlertsDispatch()
  const authDispatch = useAuthDispatch()

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault(e)
    setLoading(true)
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    axios
      .put(`${API}/users`, formData, config)
      .then((res) => {
        dispatch({
          type: "ADD",
          payload: {
            type: "success",
            message: "Profile updates successfully",
          },
        })
        authDispatch({
          type: "ADD_PROFILE",
          payload: res.data.payload,
        })
        setLoading(false)
      })
      .catch((err) => {
        console.log(err?.response)
        setLoading(false)
      })
  }
  return (
    <div className={styles.profile}>
      <Section title="Edit Informations">
        <Upload
          dp={details.dp ? details.dp : details.logo}
          name={details.username ? details.username : details.name}
          page={page}
        />
        <article className={styles.contents}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              title="Firstname:"
              name="firstname"
              id="firstname"
              value={firstname}
              handleChange={handleChange}
              placeholder="Enter your First name"
            />
            <Input
              title="Lastname"
              name="lastname"
              id="lastname"
              value={lastname}
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
            {/* <Input
              title="About"
              name="about"
              id="about"
              value={about}
              handleChange={handleChange}
              placeholder="About"
              textarea={true}
            /> */}
            <Input
              type="url"
              title="Website"
              name="websitelink"
              id="website"
              value={websitelink}
              handleChange={handleChange}
              placeholder="http://..."
            />
            <Input
              type="url"
              title="Enter url if you have your cv on other website"
              name="cvlink"
              id="cvlink"
              value={cvlink}
              handleChange={handleChange}
              placeholder="http://..."
            />
            <Button text="Save" btnClass="btn-primary" loading={loading} />
          </form>
        </article>
      </Section>
      <CV userCv={details.cv} />
      <Settings page="user" />
    </div>
  )
}

export default EditProfile
