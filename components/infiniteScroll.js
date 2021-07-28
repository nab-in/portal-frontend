import axios from "axios"

const infiniteScroll = (
  page,
  data,
  loadMore,
  pages,
  url,
  setMessage,
  setItems,
  items,
  setPage,
  setLoadMore,
  results
) => {
  let itemCards = document.querySelectorAll(".main__content > .card")
  let lastItem = itemCards[itemCards.length - 1]
  if (lastItem) {
    let lastItemOffset = lastItem.offsetTop + lastItem.clientHeight
    let pageOffset = window.pageYOffset + window.innerHeight
    if (pageOffset > lastItemOffset) {
      if (
        page <= Math.ceil(data?.pager.total / data?.pager.pageSize) &&
        !loadMore &&
        pages
      ) {
        setLoadMore(true)
        axios
          .get(url)
          .then((res) => {
            if (res.data) {
              setPages(
                res.data.pager.page <=
                  Math.ceil(res.data.pager.total / res.data.pager.pageSize)
              )
              setItems(items.concat(results))
              setLoadMore(false)
              setPage(parseInt(res.data?.pager.page) + 1)
            }
          })
          .catch((err) => {
            console.log(err)
            setLoadMore(false)
          })
      }
      if (page > Math.ceil(data?.pager.total / data?.pager.pageSize)) {
        setLoadMore(false)
        setMessage("You have seen it all")
      }
    }
  }
}

export default infiniteScroll
