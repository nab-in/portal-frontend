import { useRef, useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import SubCategory from "./SubCategory"
import UseClickOutside from "../UseClickOutside"
import styles from "./category.module.sass"

// filter dropdown component per each category
const Category = ({ category, search, setSearch, url, setUrl, heights }) => {
  let [openDropdown, setOpenDropdown] = useState(false)
  let { name, children, id } = category
  const dropdownRef = useRef()
  const open = () => {
    setOpenDropdown(!openDropdown)
  }

  // check if outside is clicked
  let node = UseClickOutside(() => {
    setOpenDropdown(false)
  })

  return (
    <>
      {children?.length > 0 && (
        <div className={styles.category} ref={node}>
          <button onClick={open}>
            {name}{" "}
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
            ref={dropdownRef}
          >
            {children.map((sub) => (
              <SubCategory
                key={sub.id}
                sub={sub}
                search={search}
                setSearch={setSearch}
                category={category}
                url={url}
                setUrl={setUrl}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Category
