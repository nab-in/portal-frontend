const Section = ({ title, children }) => {
  return (
    <section>
      <header>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  )
}

export default Section
