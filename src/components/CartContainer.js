import { Fragment, useEffect, useState } from 'react';
import axios from 'axios'
import CartItem from './CartItem';
import CartFees from './CartFees';

import '../styles/Cart.css';

export default function CartContainer() {

  let [cartItems, setCartItems] = useState([]);
  let [removedItems, setRemovedItems] = useState([]);
  let [postalCode, setPostalCode] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/cart'
    })
    .then(({data}) => {
      setCartItems(data.data)
      console.log(data.data)
    });
  }, []);

  function getDeliveryTimes(event) {
    event.preventDefault()
    axios({
      method: 'get',
      url: 'http://localhost:3001/cart/' + postalCode
    })
    .then(({data}) => {
      setCartItems(data.data)
    });
  }
  function removeLineItem(lineItemId) {
    setCartItems([...cartItems.filter(item => {
      if (item.id === lineItemId) {
        setRemovedItems([...removedItems, item])
        return false
      }
      return true
    })])

  }

  function addLineItem(cartItem) {
    setCartItems([...cartItems, cartItem])
    setRemovedItems([...removedItems.filter(item => item !== cartItem)])
  }


  let mappedCartItems = cartItems.map((item, index) => item.quantity >= 1 ? <CartItem key={index} itemDataObject={item} removeLineItem={removeLineItem} /> : <Fragment />)

  return (
    <Fragment>
      <header>
        <h1>Your Cart</h1>
      </header>
      <div className="items-container">
        {mappedCartItems}
      </div>
      <div className="fees-container">
        <CartFees cartItemsArray={cartItems} />
      </div>
      <div className="call-to-actions">
        {removedItems.length > 0 && <button onClick={() => addLineItem(removedItems[0])}>add an item back</button>}
        <form onSubmit={(e)=>getDeliveryTimes(e)}>
          <label>
            Postal Code: <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </Fragment>
  );
}
