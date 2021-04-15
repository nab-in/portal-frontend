import React from "react"

const FilterCriteria = ({ search, setSearch }) => {
  console.log(search.categories)
  return (
    <div>
      {search?.keyword && <p>Keyword: {search.keyword}</p>}
      {search?.location && <p>Location: {search.location}</p>}
      {search.categories.length > 0 &&
        search.categories.map((category) => (
          <div key={category.id}>
            {category.sub_categories.length > 0 && (
              <div>
                {category.name}:&nbsp;
                {category.sub_categories.map((sub) => (
                  <span key={sub.id}>{sub.name}</span>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default FilterCriteria
