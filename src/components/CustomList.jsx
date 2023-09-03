import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PropTypes } from "prop-types";

CustomList.propTypes = {
  orderItems: PropTypes.array
}

function CustomList({orderItems}) {
  const [orderData, setOrderData] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderNote, setOrderNote] = useState("");

  useEffect(() => {
    if (orderItems.length > 0){
      setOrderData(orderItems[0].cartItems);
      setOrderTotal(orderItems[0].cartTotal);
      setOrderNote(orderItems[0].cartNote);
    }
  }, [orderItems]);

  return (
    <div className="card-title">
      <h5>訂單</h5>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">品項</th>
            <th scope="col">數量</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          {orderData && orderData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        備註: <span>{orderNote && orderNote}</span>
      </div>
      <div className="text-end">
        <h5>
          總計: <span>${orderTotal && orderTotal}</span>
        </h5>
      </div>
    </div>
  );
}
export default CustomList;
