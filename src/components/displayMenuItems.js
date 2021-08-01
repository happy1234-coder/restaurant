import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PLACE_ORDER_SELECTED_ITEMS } from "../actionTypes/placeOrderActionTypes";
import { PROCEED_TO_BILLING } from "../actionTypes/placeOrderActionTypes";
import MenuItems from "./menuItems";

import "./css/menuItems.css";

export const DisplayMenuItems = ({ message }) => {
  const [selectedItemsLength, setSelectedItemsLength] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  // const [displayFoodMenu, setDisplayFoofMenu] = useState([]);
  const dispatch = useDispatch();

  const {
    foodMenu,
    selectedMenuItems,
    billingItems,
    disableProceedToBillButton,
  } = useSelector((state) => state.placeOrder);

  const { Veg, nonVeg } = foodMenu;

  const hanldeInputChange = (add, item) => {
    if (add) {
      let a = {
        consumeId: Date.now(),
        id: item.id,
        description: item.description,
        price: item.price,
        name: item.name,
      };

      selectedItems.push(a);
      setSelectedItemsLength(selectedItemsLength + 1);
    } else {
      let filteredItem = selectedItems.filter(
        (menuItem) => menuItem.id !== item.id
      );
      setSelectedItems(filteredItem);
      setSelectedItemsLength(selectedItemsLength - 1);
    }
  };

  const handlePlaceOrderButton = () => {
    if (selectedItems.length > 0) {
      selectedMenuItems.push(...selectedItems);
      billingItems.push(...selectedItems);
      localStorage.setItem("BILLINGITEMS", JSON.stringify(billingItems));
      localStorage.setItem("CONSUMEITEMS", JSON.stringify(selectedMenuItems));

      dispatch({
        type: PLACE_ORDER_SELECTED_ITEMS,
        payload: {
          selectedMenuItems,
          billingItems,
          disableProceedToBillButton: false,
        },
      });
    }
  };

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
        <span>{selectedItemsLength + " items Selected"}</span>
        <span>
          <button
            style={{ padding: "10px", marginRight: "2px", fontWeight: "bold" }}
            className="btn"
            type="button"
            onClick={handlePlaceOrderButton}
          >
            Place Order
          </button>

          <button
            style={{ padding: "10px", fontWeight: "bold" }}
            className="btn"
            disabled={disableProceedToBillButton}
            type="button"
            onClick={() =>
              dispatch({ type: PROCEED_TO_BILLING, payload: true })
            }
          >
            Proceed To Billing ({billingItems.length})
          </button>
        </span>
      </nav>

      <div
        style={{
          paddingTop: "20px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {message}
      </div>

      <div>
        <MenuItems
          key="1234"
          cName="Veg"
          categories={useMemo(() => Veg, [Veg])}
          hanldeInputChange={(add, item) => hanldeInputChange(add, item)}
        ></MenuItems>

        <MenuItems
          key="1235"
          cName="Non-Veg"
          categories={useMemo(() => nonVeg, [nonVeg])}
          hanldeInputChange={(add, item) => hanldeInputChange(add, item)}
        ></MenuItems>
      </div>
    </div>
  );
};

export default DisplayMenuItems;
