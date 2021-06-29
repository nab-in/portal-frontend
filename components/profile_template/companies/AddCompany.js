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
              title="Company Name:"
              name="firstname"
              id="firstname"
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
              title="Bio"
              name="bio"
              id="bio"
              handleChange={handleChange}
              placeholder="Bio..."
            />
            <Button text="Save" btnClass="btn-primary" />
          </form>
        </article>
      </Section>
    </div>
  )
}

export default AddCompany
