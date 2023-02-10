import { Fragment, useEffect, useState } from 'react';
import axios from 'axios'
import CartItem from './CartItem';
import CartFees from './CartFees';

import '../styles/Cart.css';

//Styling variables

//First part given
const lineItems = [
  {
    id: 1,
    title: "Grey Sofa",
    price: 499.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75",
    swatchColor: "#959392",
    swatchTitle: "Grey"
  },
  {
    id: 2,

    title: "Blue Sofa",
    price: 994.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F3_Seater_SofaSofa_Ottoman_Off_Arm_Configuration_Two_Arms_Arm_Design_Slope_Chaise_Off_Fabric_Navy_Blue2.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#191944",
    swatchTitle: "Blue"

  },
  {
    id: 3,
    title: "White Sofa",
    price: 599.99,
    quantity: 1,

    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_IVORY_OFF_OFF_SLOPE_5379af1f-9318-4e37-b514-962d33d1ce64.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#F8F1EC",
    swatchTitle: "White"
  },
];

export default function CartContainer() {

  let [cartItems, setCartItems] = useState([]);
  let [removedItems, setRemovedItems] = useState([]);
  let [postalCode, setPostalCode] = useState([]);


  // useEffect(() => {
  //   setCartItems(lineItems);
  // }, [])

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
