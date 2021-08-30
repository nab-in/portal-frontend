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
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          id={id}
          onChange={(e) => handleChange(e)}
          className={error ? `error` : ``}
          required={required}
        />
      )}

      {error && <small className="text-danger">{error}</small>}
      {success && <small className="text-success">{success}</small>}
    </div>
  )
}

export default Input
