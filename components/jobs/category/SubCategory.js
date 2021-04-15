import React from "react"
import categories from "../../../data/categories"

const SubCategory = ({ sub, setSearch, search, category }) => {
  let { name, id } = sub
  const addCategory = () => {
    let searchCopy = search?.categories
    let categoryIndex = searchCopy?.findIndex((u) => u.id == category.id)
    if (categoryIndex >= 0) {
      searchCopy[categoryIndex] = {
        ...searchCopy[categoryIndex],
        sub_categories: searchCopy[categoryIndex].sub_categories.concat(sub),
      }
      console.log(searchCopy[categoryIndex])
      setSearch({
        ...search,
        categories: searchCopy,
      })
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
    }
  }

  return <div onClick={addCategory}>{name}</div>
}

export default SubCategory
