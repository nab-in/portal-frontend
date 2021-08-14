import axios from "axios"
import { API } from "../components/api"

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
}) => {
  if (
    search?.name.trim().length > 0 ||
    search?.location.trim().length > 0 ||
    search?.categories?.length > 0
  ) {
    setLoading(true)
    setErrors(null)
    axios
      .get(searchingUrl)
      .then((res) => {
        setNumber(res?.data?.pager.total)
        setResults(
          pageName == "jobs"
            ? res.data.jobs
            : pageName == "companies"
            ? res.data.companies
            : ""
        )

        setResultsPage(res.data?.pager.page + 1)
        setResultsPages(
          res.data.pager.page <=
            Math.ceil(res.data.pager.total / res.data.pager.pageSize)
        )

        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setResults(null)
        if (err?.response) {
          setErrors({
            type: "danger",
            msg: err?.response?.data?.message,
          })
        } else if (err?.message == "Network Error") {
          setErrors({
            type: "danger",
            msg: "Network Error",
          })
        } else {
          setErrors({
            type: "danger",
            msg: "Internal server error, please try again",
          })
        }
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
}) => {
  // getting the last item card
  let itemCards = document.querySelectorAll(".main__content > .card")
  let lastItem = itemCards[itemCards.length - 1]

  setErrors({})

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
        //   console.log(resultsPage, resultsData)
        if (!loadMore && resultsPages) {
          setLoadMore(true)
          axios
            .get(searchUrl)
            .then((res) => {
              console.log(res.data, searchUrl)

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
              console.log(err)
              setLoadMore(false)
              if (err?.response) {
                setErrors({
                  type: "danger",
                  msg: err?.response?.data?.message,
                })
              } else if (err?.message == "Network Error") {
                setErrors({
                  type: "danger",
                  msg: "Network Error",
                })
              } else {
                setErrors({
                  type: "danger",
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
          setLoadMore(true)
          axios
            .get(apiUrl)
            .then((res) => {
              if (res.data) {
                console.log(res.data)
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
              if (err?.response) {
                setErrors({
                  type: "danger",
                  msg: err?.response?.data?.message,
                })
              } else if (err?.message == "Network Error") {
                setErrors({
                  type: "danger",
                  msg: "Network Error",
                })
              } else {
                setErrors({
                  type: "danger",
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
  }
}

export default infiniteScroll
