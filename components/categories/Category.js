import React, { useState, useRef, useEffect } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import SubCategory from "./SubCategory"
import styles from "./category.module.sass"

// detect outside click hook
let useClickOutside = (handler) => {
  let node = useRef()
  useEffect(() => {
    let handle = (e) => {
      if (!node.current.contains(e.target)) {
        handler()
      }
    }
    document.addEventListener("mousedown", handle)
    return () => {
      document.removeEventListener("mousedown", handle)
    }
  })
  return node
}

// filter dropdown component per each category
const Category = ({ category, search, setSearch }) => {
  let [openDropdown, setOpenDropdown] = useState(false)
  let { name, sub_categories, id } = category
  const open = () => {
    setOpenDropdown(!openDropdown)
  }

  // check if outside is clicked
  let node = useClickOutside(() => {
    setOpenDropdown(false)
  })

  return (
    <>
      {sub_categories.length > 0 && (
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
          >
            {sub_categories.map((sub) => (
              <SubCategory
                key={sub.id}
                sub={sub}
                search={search}
                setSearch={setSearch}
                category={category}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Category
