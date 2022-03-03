import { useEffect, useRef, useState } from "react"
import Category from "../categories/Category"
import styles from "../categories/category.module.sass"
import { Swiper, SwiperSlide } from "swiper/react"

const SwiperCategories = ({ categories, search, setSearch, url, setUrl }) => {
  const node = useRef()
  const [heights] = useState([])
  let [maxHeight, setMaxHeight] = useState(100)

  useEffect(() => {
    let isMounted = true
    if (isMounted) if (heights.length > 0) setMaxHeight(Math.max(...heights))
    return () => {
      isMounted = false
    }
  }, [heights])

  return (
    <div
      className={styles.main_content}
      style={{
        marginBottom: -maxHeight - 50,
        paddingBottom: maxHeight + 50,
      }}
    >
      <div>
        <div className={styles.swiper} ref={node}>
          <Swiper
            autoHeight={true}
            slidesPerView={"auto"}
            grabCursor={true}
            style={{
              marginBottom: -maxHeight - 50,
              paddingBottom: maxHeight + 50,
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <Category
                  key={category.id}
                  category={category}
                  search={search}
                  setSearch={setSearch}
                  url={url}
                  setUrl={setUrl}
                  heights={heights}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default SwiperCategories
