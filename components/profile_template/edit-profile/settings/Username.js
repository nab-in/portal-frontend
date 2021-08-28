import {useState} from "react"
import Accordion from "./Accordion"
import Input from "../../../inputs/Input"
import Button from "../../../buttons/FormButton"
import {config} from "../../../config"
import {API} from "../../../api"
import axios from "axios"
import styles from "./settings.module.sass"
import checkSymbols, { checkChange } from "../../../checkSymbols"

const Username = ({ username }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    userpassword: ""
  })
  const handleChange = (e) => {
    let {name, value} = e.target
    setFormData({...formData, [name]: value})
    if(name == "username") checkChange(formData.username, setError)
  }
  const handleSubmit = (e) => {
    e.preventDefault(e)
    setLoading(true)
    axios.put(`${API}/users`, formData, config).then(res => {
      console.log(res.data);
      setLoading(false)
    }).catch(err => {
      console.log(err?.response);
      setLoading(false)
    })
  }

  checkSymbols(formData.username, setError)

  let title = (
    <span>
      Change username <strong> ({username})*</strong>
    </span>
  )
  return (
    <Accordion title={title} items={error}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input title="Enter your new username" handleChange={handleChange} value={formData.username} name="username" error={error && error.msg} />
        <Input
          type="password"
          title="Enter Password"
          handleChange={handleChange}
          value={formData.userpassword}
          name="userpassword"
        />
        <Button text="Update" btnClass="btn-primary" loading={loading} />
      </form>
    </Accordion>
  )
}

export default Username
