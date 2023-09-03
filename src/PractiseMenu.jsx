import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ListGroup from './components/ListGroup';
import CustomList from './components/CustomList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function PractiseMenu() {

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartNote, setCartNote] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.subtotal;
    })
    setCartTotal(total);
  }, [cartItems]);

  const handleClickListGroup = (selectedItem) =>{
    if(cartItems.find(item => item.id === selectedItem.id)){
      const newCartItems = cartItems.map(item => {
        if(item.id === selectedItem.id){
          return {...item, quantity: item.quantity + 1, subtotal: item.subtotal + item.price}
        }
        return item;
      })
      setCartItems(newCartItems);
    } else{
      setCartItems([...cartItems, {...selectedItem, quantity: 1, subtotal: selectedItem.price}]);
    }
  }

  const handleSubmit = () => {
    const newOrderItems = [{cartItems, cartTotal, cartNote}];
    setOrderItems(newOrderItems);
    setCartItems([]);
    setCartTotal(0);
    setCartNote("");
  }

  const addQuantity =(itemId, value) => {
    const newCartItems = cartItems.map((cartItem) => {
      if(cartItem.id === itemId){
        return {...cartItem, quantity: value, subtotal: cartItem.price * value}
      }
      return cartItem;
    })
    setCartItems(newCartItems);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <ListGroup handleClick={handleClickListGroup} />
        </div>
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" width="50">
                  操作
                </th>
                <th scope="col">品項</th>
                <th scope="col">描述</th>
                <th scope="col" width="90">
                  數量
                </th>
                <th scope="col">單價</th>
                <th scope="col">小計</th>
              </tr>
            </thead>
            <tbody>
              {cartItems &&
                cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          setCartItems(
                            cartItems.filter(
                              (cartItem) => item.id !== cartItem.id
                            )
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <small>{item.description}</small>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={item.quantity}
                        onChange={(e) => {
                          addQuantity(item.id, e.target.value);
                        }}
                      >
                        (
                        {Array.from(
                          { length: 10 },
                          (_, index) => {
                            if (item.quantity - 4 < 0) {
                              return index + 1;
                            } 
                            else {
                              return item.quantity - 4 + index
                            }
                          }
                        ).map((item) => {
                          return (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          );
                        })}
                        )
                      </select>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.subtotal}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {cartItems.length === 0 ? <div className="alert alert-primary text-center" role="alert">
              請選擇商品
            </div> :
          (<><div className="text-end mb-3">
            <h5>
              總計: <span>{cartTotal}</span>
            </h5>
          </div>
          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="備註"
            value={cartNote}
            onChange={(e) => setCartNote(e.target.value)}
          ></textarea>
          <div className="text-end">
            <button className="btn btn-primary" onClick={handleSubmit}>
              送出
            </button>
          </div></>)
          }
        </div>
      </div>
      <hr />
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              { orderItems.length === 0 ? 
                <div className="alert alert-secondary text-center" role="alert">尚未建立訂單</div>:
                <CustomList orderItems={orderItems} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PractiseMenu
