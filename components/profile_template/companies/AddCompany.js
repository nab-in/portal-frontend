import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Section from "../Section"
import Input from "../../inputs/Input"
import Button from "../../buttons/FormButton"
import { API } from "../../api"

const AddCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    website: "",
    title: "",
    bio: "",
  })
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    axios
      .post(`${API}/companies`, formData, config)
      .then((res) => {
        console.log(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  return (
    <div>
      <Section title="Add Company">
        <article>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              title="Company Name:"
              name="name"
              id="name"
              handleChange={handleChange}
              placeholder="Enter your Company name"
            />
            <Input
              title="Location"
              name="location"
              id="location"
              handleChange={handleChange}
              placeholder="Company location"
            />
            <Input
              title="Website"
              name="website"
              id="website"
              handleChange={handleChange}
              placeholder="http://..."
            />
            <Input
              title="Title"
              name="title"
              id="title"
              handleChange={handleChange}
              placeholder="Company Title"
            />
            <Input
              title="About"
              name="bio"
              id="bio"
              handleChange={handleChange}
              placeholder="Bio..."
              textarea={true}
            />
            <Button text="Save" btnClass="btn-primary" loading={loading} />
          </form>
        </article>
      </Section>
    </div>
  )
}

export default AddCompany
