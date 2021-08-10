import { useEffect } from "react"
import axios from "axios"

export const searching = ({
  url,
  setResults,
  setLoading,
  setErrors,
  pageName,
  searchUrl,
}) => {
  if (searchUrl.trim().length > 0) {
    setLoading(true)
    axios
      .get(url + searchUrl)
      .then((res) => {
        setResults(
          pageName == "jobs"
            ? res.data.jobs
            : pageName == "companies"
            ? res.data.companies
            : ""
        )
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
}

const infiniteScroll = ({
  url,
  searchUrl,
  setErrors,
  setPages,
  setPage,
  setItems,
  setResults,
  items,
  results,
  page,
  setLoadMore,
  loadMore,
  data,
  pageName,
  setMessage,
  pages,
}) => {
  const handleScroll = () => {
    // getting the last item card
    let itemCards = document.querySelectorAll(".main__content > .card")
    let lastItem = itemCards[itemCards.length - 1]

    // checking for the last job item
    if (lastItem) {
      let lastItemOffset = lastItem.offsetTop + lastItem.clientHeight
      let pageOffset = window.pageYOffset + window.innerHeight
      if (pageOffset > lastItemOffset) {
        // checking if page number is less than the actual number of pages sent from api
        if (
          page <= Math.ceil(data?.pager.total / data?.pager.pageSize) &&
          !loadMore &&
          pages
        ) {
          // fetch more items
          setLoadMore(true)
          if (searchUrl.trim().length > 0) {
            axios
              .get(url + searchUrl)
              .then((res) => {
                // console.log(res.data)
                if (res.data) {
                  // check if number of pages returned from api is less than the actual number of pages
                  setPages(
                    res.data.pager.page <=
                      Math.ceil(res.data.pager.total / res.data.pager.pageSize)
                  )

                  //   concatenating jobs items
                  setResults(
                    results.concat(
                      pageName == "jobs"
                        ? res.data.jobs
                        : pageName == "companies"
                        ? res.data.companies
                        : ""
                    )
                  )
                  setLoadMore(false)

                  // setting the page number
                  setPage(parseInt(res.data?.pager.page) + 1)
                }
              })
              .catch((err) => {
                console.log(err)
                setLoadMore(false)
              })
          } else {
            axios
              .get(url)
              .then((res) => {
                if (res.data) {
                  // check if number of pages returned from api is less than the actual number of pages
                  //   console.log(res.data)
                  setPages(
                    res.data.pager.page <=
                      Math.ceil(res.data.pager.total / res.data.pager.pageSize)
                  )

                  //   concatenating jobs items
                  setItems(
                    items.concat(
                      pageName == "jobs"
                        ? res.data.jobs
                        : pageName == "companies"
                        ? res.data.companies
                        : ""
                    )
                  )
                  setLoadMore(false)

                  // setting the page number
                  setPage(parseInt(res.data?.pager.page) + 1)
                }
              })
              .catch((err) => {
                console.log(err)
                setLoadMore(false)
              })
          }
        }
        //  checks if existing page number is greater than the page returned from the api
        if (page > Math.ceil(data?.pager.total / data?.pager.pageSize)) {
          setLoadMore(false)
          setMessage("You have seen it all")
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })

  return null
}

export default infiniteScroll
