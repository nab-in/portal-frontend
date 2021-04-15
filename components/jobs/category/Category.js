import React from "react"
import SubCategory from "./SubCategory"

// filter dropdown component per each category
const Category = ({ category, search, setSearch }) => {
  let { name, sub_categories, id } = category
  return (
    <div>
      {name}
      {sub_categories.length > 0 &&
        sub_categories.map((sub) => (
          <SubCategory
            key={sub.id}
            sub={sub}
            search={search}
            setSearch={setSearch}
            category={category}
          />
        ))}
    </div>
  )
}

export default Category
