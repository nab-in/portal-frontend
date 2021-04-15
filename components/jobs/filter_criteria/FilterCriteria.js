import React from "react"
import { AiOutlineClose } from "react-icons/ai"
import FilterItem from "./FilterItem"
import styles from "./filter.module.sass"

// displays filter criteria set in the hero component
const FilterCriteria = ({ search, setSearch }) => {
  // setSearch will be used to remove criteria when remove action is called

  return (
    <div>
      {search?.keyword && (
        <p>
          Keyword: {search.keyword}
          <span
            onClick={() =>
              setSearch({
                ...search,
                keyword: "",
              })
            }
          >
            X
          </span>
        </p>
      )}
      {search?.location && (
        <p>
          Location: {search.location}
          <span
            onClick={() =>
              setSearch({
                ...search,
                location: "",
              })
            }
          >
            X
          </span>
        </p>
      )}
      {search?.categories?.length > 0 &&
        search.categories.map((category) => (
          <div key={category.id}>
            {category.sub_categories.length > 0 && (
              <div>
                {category.name}:&nbsp;&nbsp;&nbsp;
                {category.sub_categories.map((sub) => (
                  <FilterItem
                    key={sub.id}
                    sub={sub}
                    setSearch={setSearch}
                    category={category}
                    search={search}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default FilterCriteria
