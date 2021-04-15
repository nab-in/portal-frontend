import React from "react"

const SubCategory = ({ sub, setSearch, search, category }) => {
  let { name, id } = sub //sub category destructuring

  // adding sub category

  const addCategory = () => {
    let searchCopy = search?.categories

    // checking if category exists in search state

    let categoryIndex = searchCopy?.findIndex((u) => u.id == category.id)

    // if category exists this run

    if (categoryIndex >= 0) {
      let SubCategoryIndex = searchCopy[
        categoryIndex
      ]?.sub_categories?.findIndex((u) => u.id == sub.id)

      if (SubCategoryIndex >= 0) {
        // remove sub_category function goes here
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
    }
  }

  return <div onClick={addCategory}>{name}</div>
}

export default SubCategory
