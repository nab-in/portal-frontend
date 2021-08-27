import { useEffect, useRef, useState } from "react"
import Category from "../categories/Category"
import styles from "../categories/category.module.sass"
import { Swiper, SwiperSlide } from "swiper/react"

const SwiperCategories = ({ categories, search, setSearch, url, setUrl }) => {
  const node = useRef()
  let output = []
  const [start, setStart] = useState(false)
  const [clientX, setClientX] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const [heights, setHeights] = useState(output)
  const WIDTH = node.current?.scrollWidth
  const [lastTouch, setLastTouch] = useState(0)
  const [movement, setMovement] = useState(0)
  // const handleWheel = (e) => {
  //   handleMovement(e.deltaX)
  // }

  // const handleTouchStart = (e) => {
  //   setLastTouch(e.nativeEvent.touches[0].clientX)
  // }

  // const handleTouchMove = (e) => {
  //   const delta = lastTouch - e.nativeEvent.touches[0].clientX
  //   setLastTouch(e.nativeEvent.touches[0].clientX)

  //   handleMovement(delta)
  // }

  // const handleTouchEnd = (e) => {
  //   setLastTouch(0)
  // }

  // const handleMovement = (delta) => {
  //   setMovement((prevMov) => {
  //     let nextMovement = prevMov + delta
  //     if (prevMov < 0) {
  //       nextMovement = 0
  //     }
  //     if (nextMovement > WIDTH - 200) {
  //       nextMovement = WIDTH - 200
  //     }
  //     return nextMovement
  //   })
  // }

  // const handleMouseMovement = (e) => {
  //   setClientX(e.clientX)
  // }

  let maxHeight = 100

  useEffect(() => {
    if (heights.length > 0) maxHeight = Math.max(...heights)
  }, [heights])

  // const handleMouseStart = (e) => {
  //   setStart(true)
  //   setClientX(e.clientX)
  //   setIsMoving(false)
  // }

  // const handleMouseMove = (e) => {
  //   setIsMoving(true)
  //   if (start && isMoving) handleMouseMovement(e)
  // }

  // const handleMouseEnd = (e) => {
  //   setStart(false)
  //   setIsMoving(false)
  //   setClientX(e.clientX)
  // }

  // useEffect(() => {
  //   if (isMoving)
  //     setMovement((prevMov) => {
  //       let nextMovement
  //       if (clientX > prevMov) {
  //         console.log("clie > prev")
  //         nextMovement = clientX
  //       }
  //       if (clientX < prevMov) {
  //         console.log("prev > clien")
  //         nextMovement = clientX
  //       }
  //       if (prevMov == clientX) {
  //         console.log("prev == clie")
  //         nextMovement = 0
  //       }
  //       if (clientX == 0) {
  //         console.log("prev < 0")
  //         nextMovement = 0
  //       }
  //       if (nextMovement > WIDTH - 200) {
  //         console.log("end")
  //         nextMovement = WIDTH - 200
  //       }
  //       console.log(clientX)
  //       console.log(prevMov)
  //       console.log(nextMovement)
  //       return nextMovement
  //     })
  // }, [clientX])

  return (
    <div
      className={styles.main_content}
      style={{
        paddingBottom: maxHeight + 50,
        marginBottom: -maxHeight - 50,
      }}
    >
      <div
      // className={styles.main}
      // onWheel={handleWheel}
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
      // onMouseDown={handleMouseStart}
      // onMouseMove={handleMouseMove}
      // onMouseUp={handleMouseEnd}
      >
        <div
          className={styles.swiper}
          style={{
            transform: `translateX(${movement * -1}px)`,
          }}
          ref={node}
        >
          <Swiper
            autoHeight={true}
            slidesPerView={"auto"}
            grabCursor={true}
            style={{
              marginBottom: "-250px",
              paddingBottom: "250px",
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
                  output={output}
                  heights={heights}
                  setHeights={setHeights}
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
