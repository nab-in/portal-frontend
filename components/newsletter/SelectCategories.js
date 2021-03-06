import { useState, useEffect } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import UseClickOutside from "../UseClickOutside"
import { API } from "../api"
import axios from "axios"
import { useAuthState, useAuthDispatch } from "../../context/auth"
import styles from "./categories.module.sass"

const SubCategory = ({ sub, selected, setSelected }) => {
  let [checked, setChecked] = useState(false)
  const { id, name } = sub
  let selectedCopy = selected
  let categoriesIndex = selected?.findIndex((el) => el.id == id)
  const toggleSubCategory = () => {
    if (categoriesIndex === -1) {
      selectedCopy.push({ id })
      setSelected(selectedCopy)
      setChecked(true)
    } else {
      selectedCopy = selectedCopy.filter((el) => {
        return el.id !== id
      })
      setSelected(selectedCopy)
      setChecked(false)
    }
  }

  useEffect(() => {
    // updating UI when subcategory is removed from filter criteria
    let isMounted = true
    if (isMounted)
      if (categoriesIndex === -1 || categoriesIndex === undefined) {
        setChecked(false)
      }
    return () => {
      isMounted = false
    }
  }, [selected])

  return (
    <div
      onClick={toggleSubCategory}
      className={
        checked
          ? `${styles.sub__category} ${styles.checked}`
          : `${styles.sub__category}`
      }
    >
      <div className={styles.label}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 25">
          <path
            strokeLinecap="round"
            strokeMiterlimit="10"
            fill="none"
            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
          />
        </svg>
        <span> {name}</span>
      </div>
    </div>
  )
}

const SelectCategories = ({ setSelected, selected, bg }) => {
  let [openDropdown, setOpenDropdown] = useState(false)
  const dispatch = useAuthDispatch()
  const [loading, setLoading] = useState(false)
  const { categories } = useAuthState()
  const [errors, setErrors] = useState(null)
  const [jobCategories, setJobCategories] = useState([])
  const open = () => {
    setOpenDropdown(!openDropdown)
  }

  // check if outside is clicked
  let node = UseClickOutside(() => {
    setOpenDropdown(false)
  })

  const clickDropDown = () => {
    if (categories?.length <= 2) {
      setLoading(true)
      axios
        .get(
          `${API}/jobCategories?fields=id,name,children[id, name]&filter=verified:eq:true`
        )
        .then((res) => {
          setErrors(null)
          dispatch({
            type: "CATEGORIES",
            payload: res?.data?.jobCategories,
          })
          let data
          let filter = []
          data = res.data.jobCategories
          data.forEach((el) => {
            if (el.children) filter = filter.concat(el.children)
          })
          filter.forEach((el) => {
            data = data.filter((o) => o.id != el.id)
          })
          setJobCategories(data)
          setLoading(false)
        })
        .catch((err) => {
          dispatch({
            type: "CATEGORIES_FAIL",
          })
          setLoading(false)
          if (err?.response) {
            setErrors({
              type: "danger",
              msg: err.response?.data?.message,
            })
          } else if (err?.message) {
            if (err?.code === "ECONNREFUSED") {
              setErrors({
                type: "danger",
                msg: "Failed to connect",
              })
            } else {
              setErrors({
                type: "danger",
                msg: err?.message,
              })
            }
          } else {
            setErrors({
              type: "danger",
              msg: "Internal server error, please refresh",
            })
          }
        })
    } else {
      let data = categories?.filter((el) => el.id != 12)
      setJobCategories(data?.filter((el) => el.id != 13))
    }
  }

  return (
    <div
      className={
        bg === "white"
          ? `${styles.categories} ${styles.white}`
          : `${styles.categories} ${styles.dark}`
      }
      ref={node}
    >
      <button
        onClick={() => {
          clickDropDown()
          open()
        }}
      >
        Select your preferences
        {openDropdown ? (
          <FaChevronUp className={styles.icon} />
        ) : (
          <FaChevronDown className={styles.icon} />
        )}
      </button>
      <div
        className={
          openDropdown
            ? `${styles.open} ${styles.dropdown}`
            : `${styles.dropdown}`
        }
      >
        {loading ? (
          <div
            className={styles.loader}
            style={{
              height: 20,
              width: "95%",
              margin: "1rem auto",
            }}
          >
            <span className="loader" />
          </div>
        ) : (
          <>
            {errors?.msg && <p className="alerts danger">{errors.msg}</p>}
            {jobCategories?.length === 0 ? (
              <p>No category to select</p>
            ) : (
              <>
                {jobCategories.map((sub) => (
                  <SubCategory
                    key={sub?.id}
                    sub={sub}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SelectCategories
