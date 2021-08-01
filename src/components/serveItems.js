import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CONSUME_MORE_ITEMS,
  PROCEED_TO_BILLING,
} from "../actionTypes/placeOrderActionTypes";
import "./css/menuItems.css";

export default function DisplayTableModal() {
  const [consumeItems, setConsumeItems] = useState([]);
  const OderedItems = useSelector((state) => state.placeOrder);
  const { selectedMenuItems } = OderedItems;

  const dispatch = useDispatch();

  useEffect(() => {
    setConsumeItems(selectedMenuItems);
  }, [selectedMenuItems]);

  function handleConsumeClick(item) {
    console.log(consumeItems, item);
    let menuItems = consumeItems.filter(
      (menuItem) => menuItem.consumeId !== item.consumeId
    );
    setConsumeItems(menuItems);
    localStorage.setItem("CONSUMEITEMS", JSON.stringify(menuItems));
  }

  function handleWantMore() {
    localStorage.setItem("CONSUMEITEMS", JSON.stringify(consumeItems));
    dispatch({ type: CONSUME_MORE_ITEMS, payload: consumeItems });
  }

  function handleProceedToBill() {
    localStorage.setItem("CONSUMEITEMS", JSON.stringify(consumeItems));
    dispatch({ type: PROCEED_TO_BILLING, payload: true });
  }

  return (
    <div>
      <nav
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          padding: "2% 0%",
          backgroundColor: "darkcyan",
        }}
      >
        <span>
          <button
            style={{ padding: "10px", marginRight: "2px", fontWeight: "bold" }}
            className="btn"
            type="button"
            onClick={handleWantMore}
          >
            Want More
          </button>

          <button
            style={{ padding: "10px", fontWeight: "bold" }}
            className="btn"
            type="button"
            onClick={handleProceedToBill}
          >
            Proceed To Billing
          </button>
        </span>
      </nav>

      <div
        style={{ paddingTop: "20px", fontWeight: "bold", textAlign: "center" }}
      >
        Items Served! Click on the Item to consume
      </div>
      <div
        style={{
          width: "auto",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {consumeItems.map((item) => {
          return (
            <div
              key={item.consumeId}
              className="container"
              onClick={() => handleConsumeClick(item)}
            >
              <div className="content">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
