import React from "react";
import { useSelector } from "react-redux";

const DisplayMenuItems = React.lazy(() => import("./displayMenuItems"));
const DisplayTableModal = React.lazy(() => import("./serveItems"));
const DisplayBillingModal = React.lazy(() => import("./displayBillingScreen"));

const RestaurentScreen = ({ message }) => {
  const placeOrder = useSelector((state) => state.placeOrder);

  const {
    openTableModal,
    openProceedToBillingModal,
    openMenuScreen,
    openPdfScreen,
  } = placeOrder;

  return (
    <div>
      {openMenuScreen && (
        <DisplayMenuItems message={message}></DisplayMenuItems>
      )}
      {openTableModal && <DisplayTableModal></DisplayTableModal>}
      {openProceedToBillingModal && <DisplayBillingModal></DisplayBillingModal>}
      {openPdfScreen && <DisplayBillingModal></DisplayBillingModal>}
    </div>
  );
};

export default RestaurentScreen;
