import React from "react"
import Button from "../../../buttons/FormButton"

const CV = () => {
  const handleFileChange = (e) => {}
  const handleFileSubmit = (e) => {
    e.preventDefault(e)
  }
  return (
    <section>
      <header>
        <h2>Upload CV</h2>
      </header>
      <article>
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
  )
}

export default CV
