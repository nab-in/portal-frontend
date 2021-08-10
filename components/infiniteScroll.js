import axios from "axios"

export const searching = ({
  url,
  setResults,
  setLoading,
  setErrors,
  pageName,
  searchUrl,
  setResultsPage,
  setResultsPages,
}) => {
  if (url.trim().length > 0) {
    setLoading(true)
    axios
      .get(searchUrl + url)
      .then((res) => {
        console.log(res.data, searchUrl)
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
      })
  }
}

const infiniteScroll = ({
  url,
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
      if (url.trim().length > 0) {
        // checking if page number is less than the actual number of pages sent from api
        //   console.log(resultsPage, resultsData)
        if (!loadMore && resultsPages) {
          setLoadMore(true)
          axios
            .get(searchUrl + url)
            .then((res) => {
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
