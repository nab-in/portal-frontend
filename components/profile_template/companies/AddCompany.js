import { useState } from "react"
import axios from "axios"
import { config } from "../../config"
import Section from "../Section"
import Input from "../../inputs/Input"
import Button from "../../buttons/FormButton"
import { API } from "../../api"
import { useAuthDispatch } from "../../../context/auth"
import { useAlertsDispatch } from "../../../context/alerts"

const AddCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    website: "",
    title: "",
    bio: "",
  })
  const dispatch = useAuthDispatch()
  const alertsDispatch = useAlertsDispatch()

  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    axios
      .post(`${API}/companies`, formData, config)
      .then((res) => {
        setLoading(false)
        alertsDispatch({
          type: "ADD",
          payload: {
            type: "success",
            message: formData.name + " was created successfully",
          },
        })
        dispatch({
          type: "ADD_COMPANY",
          payload: res.data?.payload,
        })
      })
      .catch((err) => {
        setLoading(false)
        if (err?.response) {
          alertsDispatch({
            type: "ADD",
            payload: {
              type: "danger",
              message: err.response?.data?.message,
            },
          })
        } else if (err?.message) {
          if (err?.code === "ECONNREFUSED") {
            alertsDispatch({
              type: "ADD",
              payload: {
                type: "danger",
                message: "Failed to connect, please try again",
              },
            })
          } else {
            alertsDispatch({
              type: "ADD",
              payload: {
                type: "danger",
                message: err?.message,
              },
            })
          }
        } else {
          alertsDispatch({
            type: "ADD",
            payload: {
              type: "danger",
              message: "Internal server error, please try again",
            },
          })
        }
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
