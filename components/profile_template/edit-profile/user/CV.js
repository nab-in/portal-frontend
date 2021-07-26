import { useState } from "react"
// import { AiOutlineCloudUpload } from "react-icons/ai"
import Section from "../../Section"
import Button from "../../../buttons/FormButton"
import styles from "./cv.module.sass"
import axios from "axios"
import { API } from "../../../api"
import Cookies from "js-cookie"
import { useAlertsDispatch } from "../../../../context/alerts"
import { useAuthDispatch } from "../../../../context/auth"

const CV = () => {
  let [loading, setLoading] = useState(false)
  const [cv, setCv] = useState("")
  const dispatch = useAuthDispatch()
  const alertDispatch = useAlertsDispatch()
  const handleFileChange = (e) => {
    const data = new FormData()
    data.append("", e.target.files[0])
    setCv(data)
  }
  const handleFileSubmit = (e) => {
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
      .post(`${API}/users/cv`, cv, config)
      .then((res) => {
        setLoading(false)
        dispatch({
          type: "ADD_CV",
          payload: res.data,
        })
        alertDispatch({
          type: "ADD",
          payload: {
            type: "success",
            message: res.data.message,
          },
        })
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response?.data?.message)
        alertDispatch({
          type: "ADD",
          payload: {
            type: "danger",
            message: err.response?.data?.message,
          },
        })
      })
  }
  return (
    <Section title="Upload CV">
      <article className={styles.cv}>
        <form onSubmit={(e) => handleFileSubmit(e)}>
          <label htmlFor="cv">
            <input
              type="file"
              name="cv"
              id="cv"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
          <Button text="Upload" btnClass="btn-primary" />
        </form>
      </article>
    </Section>
  )
}

export default CV
