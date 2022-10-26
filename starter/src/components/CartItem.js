import { useDispatch } from 'react-redux'
import { ChevronDown, ChevronUp } from '../icons'

import { removeItem, increase, decrease } from '../features/cart/cartSlice'

export const CartItem = ({ id, title, price, img, amount }) => {
  const dispatch = useDispatch()

  const handleDecrease = () => {
    if (amount === 1) {
      dispatch(removeItem(id))
    } else {
      dispatch(decrease({ id }))
    }
  }

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button
          className='remove-btn'
          onClick={() => {
            dispatch(removeItem(id))
          }}
        >
          remove
        </button>
      </div>
      <div>
        <button
          className='amount-btn'
          onClick={() => {
            dispatch(increase({ id }))
          }}
        >
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button className='amount-btn' onClick={handleDecrease}>
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}

export default CartItem
