import { useState } from "react"
import Category from "../categories/Category"
import styles from "../categories/category.module.sass"

const Swiper = ({ categories, search, setSearch, url, setUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const WIDTH = 200
  const [lastTouch, setLastTouch] = useState(0)
  const [movement, setMovement] = useState(0)
  const handleWheel = (e) => {
    handleMovement(e.deltaX)
  }

  const handleTouchStart = (e) => {
    setLastTouch(e.nativeEvent.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    const delta = lastTouch - e.nativeEvent.touches[0].clientX
    setLastTouch(e.nativeEvent.touches[0].clientX)

    handleMovement(delta)
  }

  const handleTouchEnd = (e) => {
    setLastTouch(0)
  }

  const handleMovement = (delta) => {
    setMovement((prevMov) => {
      //   let maxLength = categories.length - 1
      let nextMovement = prevMov + delta
      if (prevMov < 0) {
        nextMovement = 0
      }
      return nextMovement
    })
  }

  console.log(lastTouch, movement)

  const handleMovementEnd = (e) => {}

  return (
    <div
      className={styles.main}
      style={{
        // width: "100%",
        // height: "auto",
        overflowX: "hidden",
        // padding: ".7rem",
        paddingBottom: "50px",
        marginBottom: "-50px",
        zIndex: 2,
        // overflowY: "visible",
        // marginRight: "1rem",
      }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={styles.swiper}
        style={{
          transform: `translateX(${movement * -1}px)`,
          //   height: "auto",
        }}
      >
        {categories.map((category) => (
          <div key={category.id} className={styles.category}>
            <Category
              category={category}
              search={search}
              setSearch={setSearch}
              url={url}
              setUrl={setUrl}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Swiper
