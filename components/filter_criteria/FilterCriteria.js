import React from "react"
import { AiOutlineClose } from "react-icons/ai"
import FilterItem from "./FilterItem"

// displays filter criteria set in the hero component
const FilterCriteria = ({ search, setSearch }) => {
  // setSearch will be used to remove criteria when remove action is called

  return (
    <div className="filter__criteria">
      {search?.name && (
        <div className="criteria">
          <div className="criteria__title">Keyword:</div>
          <div className="criteria__showcase">
            <span>
              {search.name}
              <span
                className="close"
                onClick={() =>
                  setSearch({
                    ...search,
                    name: "",
                  })
                }
              >
                <AiOutlineClose className="icon" />
              </span>
            </span>
          </div>
        </div>
      )}
      {search?.location && (
        <div className="criteria">
          <div className="criteria__title">Location:</div>
          <div className="criteria__showcase">
            <span>
              {search.location}
              <span
                className="close"
                onClick={() =>
                  setSearch({
                    ...search,
                    location: "",
                  })
                }
              >
                <AiOutlineClose className="icon" />
              </span>
            </span>
          </div>
        </div>
      )}
      {search?.categories?.length > 0 &&
        search.categories.map((category) => (
          <div key={category.id}>
            {category.sub_categories.length > 0 && (
              <div className="criteria">
                <div className="criteria__title">{category.name}:</div>
                <div className="criteria__showcase">
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
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default FilterCriteria
