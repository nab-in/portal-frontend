import React from "react"
import Accordion from "./Accordion"
import Input from "../../../inputs/Input"
import Button from "../../../buttons/FormButton"

const Password = () => {
  const handleChange = (e) => {}
  const handleSubmit = (e) => {
    e.preventDefault(e)
  }
  return (
    <Accordion title="Change Password">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          title="Enter your current email/username"
          handleChange={handleChange}
        />
        <Input
          title="Enter your current password"
          handleChange={handleChange}
        />
        <Input title="Enter New Password" handleChange={handleChange} />
        <Button text="Update" btnClass="btn-primary" />
      </form>
    </Accordion>
  )
}

export default Password
