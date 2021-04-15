import React from "react"

const FilterItem = ({ sub, search, category, setSearch }) => {
  let { name, id } = sub
  const removeCriteria = () => {
    //   categories copy
    let searchCopy = search?.categories

    // checking category index in categories array
    let categoryIndex = searchCopy?.findIndex((u) => u.id == category.id)

    // checking if subcategory exists
    let SubCategoryIndex = searchCopy[categoryIndex]?.sub_categories?.findIndex(
      (u) => u.id == id
    )

    if (SubCategoryIndex >= 0) {
      // removing sub category in sub categories array
      searchCopy[categoryIndex].sub_categories = searchCopy[
        categoryIndex
      ].sub_categories.filter((el) => el.id !== id)

      //   updating state with new categories
      setSearch({
        ...search,
        categories: searchCopy,
      })
    }
  }
  return (
    <div>
      {name}
      <span onClick={removeCriteria}>X</span>
    </div>
  )
}

export default FilterItem
