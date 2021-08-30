import { useState } from "react"
import styles from "./input.module.sass"

const Input = ({
  inputClass,
  name,
  id,
  type,
  placeholder,
  value,
  handleChange,
  title,
  error,
  success,
  textarea,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div
      className={
        error
          ? `${styles.form_control} ${inputClass} ${styles.error}`
          : `${styles.form_control} ${inputClass}`
      }
    >
      <label htmlFor={id} className="text-primary">
        {title}
      </label>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          id={id}
          onChange={(e) => handleChange(e)}
        />
      ) : (
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          name={name}
          placeholder={placeholder}
          value={value}
          id={id}
          onChange={(e) => handleChange(e)}
          className={error ? `error` : ``}
          required={required}
        />
      )}
      <span className={showPassword ? `` : ``} onClick={togglePassword}>
        {showPassword ? "hide" : "show"}
      </span>
      {error && <small className="text-danger">{error}</small>}
      {success && <small className="text-success">{success}</small>}
    </div>
  )
}

export default Input
