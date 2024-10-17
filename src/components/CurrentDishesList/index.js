import {useContext, useState, useEffect} from 'react'
import MyContext from '../../context/MyContext'
import './index.css'

const CurrentDishesList = () => {
  const {currentDishList, increaseQuantity, decreaseQuantity} = useContext(
    MyContext,
  )
  const {categoryDishes} = currentDishList

  const [categoryDishesList, setCategoryDishesList] = useState([])

  useEffect(() => {
    if (categoryDishes !== undefined) {
      setCategoryDishesList(categoryDishes)
    }
  }, [categoryDishes])

  const onClickIncreaseBtn = dishId => {
    increaseQuantity(dishId)
  }

  const onClickDecreaseBtn = dishId => {
    const currentDish = categoryDishesList.find(
      eachDish => eachDish.dishId === dishId,
    )
    if (currentDish.quantity > 0) {
      decreaseQuantity(dishId)
    }
  }

  return (
    <ul className="dishes-list">
      {categoryDishesList.map(eachItem => {
        const {
          dishId,
          dishName,
          dishPrice,
          dishCurrency,
          dishDescription,
          dishImage,
          dishCalories,
          addonCat,
          dishAvailability,
          quantity,
        } = eachItem

        return (
          <li className="item-details" key={dishId}>
            <div className="item-logo-content-card">
              <div
                className={`item-logo-card ${
                  dishAvailability ? 'available' : 'not-available'
                }`}
              >
                <div
                  className={`item-logo ${
                    dishAvailability ? 'available' : 'not-available'
                  }`}
                >
                  {}
                </div>
              </div>
              <div className="dish-name-desp-price-card">
                <p className="dish-name">{dishName}</p>
                <div className="dish-currency-price-card">
                  <p className="dish-currency">
                    {dishCurrency} {dishPrice}
                  </p>
                </div>
                <p className="dish-desp">{dishDescription}</p>
                {dishAvailability === false ? (
                  <p className="dish-availability">Not available</p>
                ) : (
                  <div className="dish-count-add-to-cart-card">
                    <div className="dish-count-card">
                      <button
                        className="dish-decrease-btn"
                        type="button"
                        onClick={() => onClickDecreaseBtn(dishId)}
                      >
                        -
                      </button>
                      <p className="dish-count">{quantity}</p>
                      <button
                        className="dish-increase-btn"
                        type="button"
                        onClick={() => onClickIncreaseBtn(dishId)}
                      >
                        +
                      </button>
                    </div>
                    {quantity > 0 && (
                      <button type="button" className="add-to-cart-button">
                        ADD TO CART
                      </button>
                    )}
                  </div>
                )}
                {addonCat.length !== 0 && (
                  <p className="customization-available">
                    Customizations available
                  </p>
                )}
              </div>
            </div>
            <div className="dish-calories-image-card">
              <p className="dish-calories">{`${dishCalories} calories`}</p>
              <img className="dish-image" src={dishImage} alt={dishName} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default CurrentDishesList
