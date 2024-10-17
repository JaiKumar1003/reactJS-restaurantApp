import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Categories from '../Categories'
import CurrentDishesList from '../CurrentDishesList'
import MyContext from '../../context/MyContext'
import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADER',
}

const RestoApp = () => {
  const {updateRestaurantName, updateRestaurantData} = useContext(MyContext)
  const [currentApiStatus, setCurrentApiStatus] = useState(apiStatus.loader)

  useEffect(() => {
    const fetchData = async () => {
      const url =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

      try {
        const response = await fetch(url)
        if (response.ok) {
          const responseData = await response.json()
          const restaurantName = responseData[0].restaurant_name
          updateRestaurantName(restaurantName)
          let tableMenuList = responseData[0].table_menu_list
          tableMenuList = tableMenuList.map(eachItem => ({
            categoryDishes: eachItem.category_dishes.map(eachDish => ({
              addonCat: eachDish.addonCat,
              dishAvailability: eachDish.dish_Availability,
              dishType: eachDish.dish_Type,
              dishCalories: eachDish.dish_calories,
              dishCurrency: eachDish.dish_currency,
              dishDescription: eachDish.dish_description,
              dishId: eachDish.dish_id,
              dishImage: eachDish.dish_image,
              dishName: eachDish.dish_name,
              dishPrice: eachDish.dish_price,
              nexturl: eachDish.nexturl,
              quantity: 0, // Initialize quantity to 0
            })),
            menuCategory: eachItem.menu_category,
            menuCategoryId: eachItem.menu_category_id,
            menuCategoryImage: eachItem.menu_category_image,
            nexturl: eachItem.nexturl,
          }))
          updateRestaurantData(tableMenuList)
          setCurrentApiStatus(apiStatus.success)
        } else {
          console.error('Failed to fetch data', response)
          setCurrentApiStatus(apiStatus.failure)
        }
      } catch (error) {
        console.error('Error fetching data', error)
        setCurrentApiStatus(apiStatus.failure)
      }
    }

    fetchData()
  }, []) // Empty dependency array to ensure it runs only once when the component mounts

  const renderSuccessView = () => (
    <div className="resto-container">
      <Header />
      <Categories />
      <CurrentDishesList />
    </div>
  )

  const onClickRetry = () => {
    setCurrentApiStatus(apiStatus.loader)
  }

  const renderFailureView = () => (
    <div className="common-container">
      <p className="not-found-heading">Not Found</p>
      <button onClick={onClickRetry} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  const renderApiStatus = () => {
    if (currentApiStatus === apiStatus.success) {
      return renderSuccessView()
    }

    return renderFailureView()
  }

  const renderLoader = () => (
    <div className="common-container">
      <Loader type="ThreeDots" height={80} width={80} color="black" />
    </div>
  )

  return (
    <div>
      {currentApiStatus === apiStatus.loader
        ? renderLoader()
        : renderApiStatus()}
    </div>
  )
}

export default RestoApp
