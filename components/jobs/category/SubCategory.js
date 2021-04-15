import React, { useEffect, useState } from "react"
import styles from "./category.module.sass"

const SubCategory = ({ sub, setSearch, search, category }) => {
  let { name, id } = sub //sub category destructuring
  let [checked, setChecked] = useState(false)

  let searchCopy = search?.categories
  // checking if category exists in search state
  let categoryIndex = searchCopy?.findIndex((u) => u.id == category.id)

  let SubCategoryIndex

  // searching if sub category exists in the category
  if (categoryIndex >= 0) {
    SubCategoryIndex = searchCopy[categoryIndex]?.sub_categories?.findIndex(
      (u) => u.id == id
    )
  }

  // toggling sub category
  const toggleSubCategory = () => {
    // if category exists this run
    if (categoryIndex >= 0) {
      if (SubCategoryIndex >= 0) {
        // remove sub_category function goes here
        searchCopy[categoryIndex].sub_categories = searchCopy[
          categoryIndex
        ].sub_categories.filter((el) => el.id !== id)

        //   updating state with new categories
        setSearch({
          ...search,
          categories: searchCopy,
        })

        // uncheck the checkbox
        setChecked(false)
      }

      // if category does not exists this run
      if (SubCategoryIndex === -1) {
        searchCopy[categoryIndex] = {
          ...searchCopy[categoryIndex],

          sub_categories: searchCopy[categoryIndex].sub_categories.concat(sub),
        }

        setSearch({
          ...search,
          categories: searchCopy,
        })
        setChecked(true)
      }
    }

    if (categoryIndex === -1) {
      setSearch({
        ...search,
        categories: searchCopy.concat({
          id: category.id,
          name: category.name,
          sub_categories: [sub],
        }),
      })
      setChecked(true)
    }
  }

  useEffect(() => {
    // updating UI when subcategory is removed from filter criteria
    if (SubCategoryIndex === -1) {
      setChecked(false)
    }
  }, [search])

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

export default SubCategory
