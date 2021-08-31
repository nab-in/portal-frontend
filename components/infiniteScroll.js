import axios from "axios"

export const searching = ({
  setResults,
  setLoading,
  setErrors,
  pageName,
  searchingUrl,
  setResultsPage,
  setResultsPages,
  search,
  setNumber,
  setMessage,
}) => {
  if (
    search?.name.trim().length > 0 ||
    search?.location.trim().length > 0 ||
    search?.categories?.length > 0
  ) {
    setLoading(true)
    axios
      .get(searchingUrl)
      .then((res) => {
        setErrors(null)
        setNumber(res?.data?.pager.total)
        setResults(
          pageName == "jobs"
            ? res.data.jobs
            : pageName == "companies"
            ? res.data.companies
            : ""
        )
        if (res?.data?.pager?.total === 0)
          setMessage("No result matching your criteria")

        setResultsPage(res.data?.pager.page + 1)
        setResultsPages(
          res.data.pager.page <=
            Math.ceil(res.data.pager.total / res.data.pager.pageSize)
        )

        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setResults(null)
        console.log(err?.response)
        if (err?.response) {
          setErrors({
            type: "normal",
            msg: err?.response?.data?.message,
          })
        } else if (err?.message) {
          if (err?.code === "ECONNREFUSED") {
            setErrors({
              type: "normal",
              msg: "Failed to connect, please refresh",
            })
          } else {
            setErrors({
              type: "normal",
              msg: err?.message,
            })
          }
        } else {
          setErrors({
            type: "normal",
            msg: "Internal server error, please try again",
          })
        }
        setMessage(null)
      })
  } else {
    setResults(null)
  }
}

const infiniteScroll = ({
  apiUrl,
  searchUrl,
  setErrors,
  setPages,
  setPage,
  setItems,
  setResults,
  items,
  results,
  setLoadMore,
  loadMore,
  pageName,
  setMessage,
  pages,
  setResultsPage,
  resultsPages,
  setResultsPages,
  search,
  config,
}) => {
  // getting the last item card
  let itemCards = document.querySelectorAll(".main__content > .card")
  let lastItem = itemCards[itemCards.length - 1]

  // checking for the last job item
  if (lastItem) {
    let lastItemOffset = lastItem.offsetTop + lastItem.clientHeight
    let pageOffset = window.pageYOffset + window.innerHeight
    if (pageOffset > lastItemOffset) {
      // fetch more items
      if (
        search?.name.trim().length > 0 ||
        search?.location.trim().length > 0 ||
        search?.categories?.length > 0
      ) {
        // checking if page number is less than the actual number of pages sent from api
        if (!loadMore && resultsPages) {
          setLoadMore(true)
          axios
            .get(searchUrl, config)
            .then((res) => {
              setErrors(null)

              // check if number of pages returned from api is less than the actual number of pages
              setResultsPages(
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

              //   // setting the page number
              setResultsPage(parseInt(res.data?.pager.page) + 1)
            })
            .catch((err) => {
              setLoadMore(false)
              if (err?.response) {
                setErrors({
                  type: "infinite",
                  msg: err?.response?.data?.message,
                })
              } else if (err?.message) {
                if (err?.code === "ECONNREFUSED") {
                  setErrors({
                    type: "infinite",
                    msg: "Failed to connect, please refresh",
                  })
                } else {
                  setErrors({
                    type: "infinite",
                    msg: err?.message,
                  })
                }
              } else {
                setErrors({
                  type: "infinite",
                  msg: "Internal server error, please try again",
                })
              }
            })
        } else {
          setLoadMore(false)
          setMessage("You have seen it all")
        }
      } else {
        // checking if page number is less than the actual number of pages sent from api
        if (!loadMore && pages) {
          // console.log("here")
          setLoadMore(true)
          axios
            .get(apiUrl, config)
            .then((res) => {
              if (res.data) {
                setErrors(null)
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
              setLoadMore(false)
              if (err?.response) {
                setErrors({
                  type: "infinite",
                  msg: err?.response?.data?.message,
                })
              } else if (err?.message) {
                if (err?.code === "ECONNREFUSED") {
                  setErrors({
                    type: "infinite",
                    msg: "Failed to connect, please refresh",
                  })
                } else {
                  setErrors({
                    type: "infinite",
                    msg: err?.message,
                  })
                }
              } else {
                setErrors({
                  type: "infinite",
                  msg: "Internal server error, please try again",
                })
              }
            })
        } else {
          //  checks if existing page number is greater than the page returned from the api
          setLoadMore(false)
          setMessage("You have seen it all")
        }
      }
    }
  } else {
    setLoadMore(false)
  }
}

export default infiniteScroll
