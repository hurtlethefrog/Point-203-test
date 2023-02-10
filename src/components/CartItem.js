import '../styles/Cart.css';


export default function CartItem({itemDataObject, removeLineItem}) {
  return (
    <div className="item-wrapper">

      <img src={itemDataObject.image} alt={itemDataObject.title}></img>

      <div className='item-info'>

        <div className='center'>
          <h3>{itemDataObject.title}</h3>
          <div className="swatch">
            <div style={{backgroundColor:itemDataObject.swatchColor }}></div>
            <p>{itemDataObject.swatchTitle}</p>
          </div>
        </div>

        <div className="right">
          <p className="price">{"$" + itemDataObject.price}</p>
          <div>
            <p className="lable">Estimated Delivery Date</p>
            <p className="date">{itemDataObject.estimatedDeliveryDate ?? "N/A" }</p>
          </div>
          <button onClick={()=> removeLineItem(itemDataObject.id)}>Remove</button>
        </div>
      
      </div>

    </div>
  );
}
