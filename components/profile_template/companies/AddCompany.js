import Section from "../Section"
import Input from "../../inputs/Input"
import Button from "../../buttons/FormButton"

const AddCompany = () => {
  const handleChange = (e) => {}
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <Section title="Add Company">
        <article>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              title="Firstname:"
              name="firstname"
              id="firstname"
              handleChange={handleChange}
              placeholder="Enter your First name"
            />
            <Input
              title="Lastname"
              name="lastname"
              id="lastname"
              handleChange={handleChange}
              placeholder="Enter your Last name"
            />
            <Button text="Save" btnClass="btn-primary" />
          </form>
        </article>
      </Section>
    </div>
  )
}

export default AddCompany
