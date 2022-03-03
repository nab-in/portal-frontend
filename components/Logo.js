const Logo = ({ height }) => {
  return (
    <img
      src="/assets/images/Logo.svg"
      alt="logo"
      height={height}
      loading="lazy"
      style={{
        width: "auto",
      }}
    />
  )
}

export default Logo
