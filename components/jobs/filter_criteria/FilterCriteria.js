import React from "react"

// displays filter criteria set in the hero component
const FilterCriteria = ({ search, setSearch }) => {
  // setSearch will be used to remove criteria when remove action is called
  return (
    <div>
      {search?.keyword && <p>Keyword: {search.keyword}</p>}
      {search?.location && <p>Location: {search.location}</p>}
      {search.categories.length > 0 &&
        search.categories.map((category) => (
          <div key={category.id}>
            {category.sub_categories.length > 0 && (
              <div>
                {category.name}:&nbsp;&nbsp;&nbsp;
                {category.sub_categories.map((sub) => (
                  <span key={sub.id}>{sub.name}&nbsp; &nbsp;&nbsp;</span>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default FilterCriteria
