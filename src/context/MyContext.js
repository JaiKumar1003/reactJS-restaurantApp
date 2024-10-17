import {createContext} from 'react'

const MyContext = createContext({
  restaurantData: [],
  updateRestaurantData: () => {},
  currentDishCategory: '',
  updateCurrentDishCategory: () => {},
  restaurantName: '',
  updateRestaurantName: () => {},
  currentDishList: {},
  updateCurrentDishList: () => {},
  cartItem: 0,
  increaseCartItem: () => {},
  decreaseCartItem: () => {},
})

export default MyContext
