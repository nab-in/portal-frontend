import React from "react"
import categories from "../../../data/categories"
import SubCategory from "./SubCategory"

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
