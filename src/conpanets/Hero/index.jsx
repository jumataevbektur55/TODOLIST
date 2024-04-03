import React, { useEffect, useState } from "react";
import { ImListNumbered } from "react-icons/im";
const Hero = () => {
  const [value, setValue] = useState("");
  const [valueImg, setValueImg] = useState("");
  const [valuePrice, setValuePrice] = useState("");
  const [data, setData] = useState([]);
  
  function addTask() {
    setValue("");
    setValueImg("");
    setValuePrice("");
    if (value === "" || valueImg === "" || valuePrice === "") {
      return "toltur";
    } else {
      let obj = {
        id: data.length ? data[data.length - 1].id + 1 : 1,
        product1: value,
        product2: valueImg,
        product3: valuePrice,
      };
      let task = JSON.parse(localStorage.getItem("todo")) || [];
      task.push(obj);
      localStorage.setItem("todo", JSON.stringify(task));
      readItem();
    }
  }
  function deleteTask(btnId) {
    localStorage.setItem("todo", JSON.stringify([...data.filter((el) => el.id !== btnId)]))
    readItem()

  }
  function readItem() {
    let task = JSON.parse(localStorage.getItem("todo")) || [];
    setData(task);
  }
  useEffect(() => {
    readItem();
  }, []);

  return (
    <div>
      <div id="hero">
        <div className="container">
          <h1>To Do List</h1>
          <div className="hero">
            <input
              type="text"
              onChange={(e) => setValue(e.target.value)}
              placeholder="img"
              value={value}
            />
            <input
              type="text"
              onChange={(e) => setValueImg(e.target.value)}
              value={valueImg}
              placeholder="Product Name"
            />
            <input
              type="text"
              onChange={(e) => setValuePrice(e.target.value)}
              value={valuePrice}
              placeholder="price"
            />

            <button onClick={() => addTask()}>Buy</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <ImListNumbered />
                </th>
                <th scope="col">IMG</th>
                <th scope="col">Product Name:</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.sort((a,b)=> a.product3 - b.product3).map((el) => (
                <tr>
                <th scope="row">{data.length}</th>
                <th><img className="img" src={el.product1} alt="" /></th>
                <th>{el.product2}</th>
                <th className="tt1">{el.product3}$</th>
                <th>
                  <button onClick={() => {
                    deleteTask(el.id)
                  }}>Delete</button>
                </th>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Hero;
