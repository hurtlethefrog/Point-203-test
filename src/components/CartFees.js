import { Fragment, useEffect, useState } from 'react';
import '../styles/Cart.css';

function calculateFees(cartItemsArray, shipping = 15) {
  let output = {
    subtotal: 0,
    tax: 0,
    shipping,
  }

  cartItemsArray.forEach((item)=>{
    output.subtotal += item.price * item.quantity
    output.tax += item.price * item.quantity * 0.13
  })

  return output
}

export default function CartFees({ cartItemsArray }) {
  let [fees, setFees] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 0
  })

  const formattingOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }

  useEffect(() => {
    setFees(calculateFees(cartItemsArray))
  }, [cartItemsArray])

  return (
    <Fragment>
      <div>
        <p>Subtotal</p>
        <p>{fees.subtotal.toLocaleString("en-US", formattingOptions)}</p>
      </div>
      <div>
        <p>Taxes (estimated)</p>
        <p>{fees.tax.toLocaleString("en-US", formattingOptions)}</p>
      </div>
      <div>
        <p>Shipping</p>
        <p>{fees.shipping === 0 ? "Free" : fees.shipping.toLocaleString("en-US", formattingOptions)}</p>
      </div>
      <div className='total'>
        <p>Total</p>
        <p>{Object.values(fees).reduce((a, b) => a + b).toLocaleString("en-US", formattingOptions)}</p>
      </div>
    </Fragment>
  );
}
