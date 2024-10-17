import {useContext} from 'react'
import {GrCart} from 'react-icons/gr'
import MyContext from '../../context/MyContext'
import './index.css'

const Header = () => {
  const {cartItem, restaurantName} = useContext(MyContext)
  return (
    <div className="header-card">
      <h1 className="heading">{restaurantName}</h1>
      <div className="cart-name-icon-card">
        <p className="cart-name">My Orders</p>
        <div className="cart-card">
          <span className="span-count">{cartItem}</span>
          <GrCart className="cart-icon" />
        </div>
      </div>
    </div>
  )
}

export default Header
