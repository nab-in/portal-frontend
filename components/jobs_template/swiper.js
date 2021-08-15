import { useRef, useState } from "react"
import Category from "../categories/Category"
import styles from "../categories/category.module.sass"

const Swiper = ({ categories, search, setSearch, url, setUrl }) => {
  const node = useRef()
  const [heights, setHeights] = useState([])
  const WIDTH = node.current?.scrollWidth
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
      let nextMovement = prevMov + delta
      if (prevMov < 0) {
        nextMovement = 0
      }
      if (nextMovement > WIDTH - 200) {
        nextMovement = WIDTH - 200
      }
      return nextMovement
    })
  }

  const maxWidth = Math.max(...heights)

  const handleMovementEnd = (e) => {}

  return (
    <div
      className={styles.main}
      style={{
        paddingBottom: maxWidth + 50,
        marginBottom: -maxWidth - 50,
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
        }}
        ref={node}
      >
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            search={search}
            setSearch={setSearch}
            url={url}
            setUrl={setUrl}
            setHeights={setHeights}
            heights={heights}
          />
        ))}
      </div>
    </div>
  )
}

export default Swiper
