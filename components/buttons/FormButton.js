import rippleEffect from "../rippleEffect.js"
import Loader from "../loaders/ButtonLoader"

const FormButton = ({
  text,
  btnClass,
  btnGroupClass,
  loading,
  click,
  fontSize,
  fontWeight,
  color,
  bg,
}) => {
  return (
    <div className={`btn-group ${btnGroupClass}`} onClick={click}>
      <button
        className={`btn ${btnClass}`}
        onClick={rippleEffect}
        style={{
          fontSize: fontSize && fontSize,
          fontWeight: fontWeight && fontWeight,
          color: color ? color : "white",
        }}
      >
        {text}
        {loading && <Loader bg={bg} />}
      </button>
    </div>
  )
}

export default FormButton
