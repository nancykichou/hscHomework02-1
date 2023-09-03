import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PropTypes } from "prop-types";

ListGroup.propTypes = {
  handleClick: PropTypes.func
};

function ListGroup({handleClick}) {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch('./dataBase.json')  // 注意路徑是相對於 public 資料夾的
      .then(response => response.json())
      .then(data => setJsonData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleClickListGroup = (e) => {
    const selectItem = jsonData.filter((item) => (item.id === e))
    handleClick(selectItem[0])
  }

  return (
    <>
      <h5>菜單</h5>
      <div className="list-group">
        {jsonData.map((item) => (
          <a
            key={item.id}
            value={item.id}
            href="#"
            className="list-group-item list-group-item-action"
            onClick={() => handleClickListGroup(item.id)}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{item.name}</h5>
              <small>{item.price}</small>
            </div>
            <p className="mb-1">{item.description}</p>
          </a>
        ))}
      </div>
    </>
  );
} 

export default ListGroup;