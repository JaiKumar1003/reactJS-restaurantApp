import {useState, useRef, useEffect, useContext} from 'react'
import MyContext from '../../context/MyContext'
import './index.css'

const Categories = () => {
  const {
    updateCurrentDishList,
    restaurantData,
    updateCurrentDishCategory,
  } = useContext(MyContext)

  let idCount = 0
  const menuCategory = restaurantData.map(eachItem => {
    idCount += 1
    return {id: idCount, menuName: eachItem.menuCategory}
  })
  const items = [...menuCategory]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showArrow, setShowArrow] = useState(false)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    updateCurrentDishCategory(restaurantData[0].menuCategoryId)
    updateCurrentDishList(restaurantData[0])
  }, [restaurantData, updateCurrentDishList])

  useEffect(() => {
    updateCurrentDishCategory(restaurantData[currentIndex].menuCategoryId)
    updateCurrentDishList(restaurantData[currentIndex])
  }, [currentIndex, restaurantData, updateCurrentDishList])

  useEffect(() => {
    const container = scrollContainerRef.current
    const isSmallScreen = window.innerWidth < 768

    if (isSmallScreen) {
      const itemWidth = container.clientWidth / 2
      container.style.transition = 'transform 0.3s ease-in-out'

      const translateX = -currentIndex * itemWidth
      container.style.transform = `translateX(${translateX}px)`

      // Show or hide the arrow based on the current index
      if (currentIndex === items.length - 1) {
        setShowArrow(true)
      } else {
        setShowArrow(false)
      }
    } else {
      container.style.transform = 'none'
      setShowArrow(false)
    }
  }, [currentIndex, items.length])

  const handleClick = index => {
    setCurrentIndex(index)
  }

  const scrollToFirst = () => {
    setCurrentIndex(0)
    setShowArrow(false) // Hide the arrow after resetting
  }

  return (
    <div className="categories-container">
      <ul className="categories-list" ref={scrollContainerRef}>
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`categorie-item ${
              index === currentIndex ? 'selected' : ''
            }`}
          >
            <button
              data-index={index}
              onClick={() => handleClick(index)}
              className={`categorie-btn ${
                index === currentIndex ? 'selected' : ''
              }`}
              type="button"
            >
              {item.menuName}
            </button>
          </li>
        ))}
      </ul>
      {showArrow && (
        <button
          className="scroll-to-first"
          onClick={scrollToFirst}
          type="button"
        >
          &larr; {/* Left arrow symbol */}
        </button>
      )}
    </div>
  )
}

export default Categories
