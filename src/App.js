import React from "react";
import "./App.css";
import { useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHANGE_SCREEN,
  PROCEED_TO_BILLING_RELOAD,
  CONSUME_ITEMS_RELOAD,
} from "./actionTypes/placeOrderActionTypes";
import ErrorBoundary from "./ErrorBoundary";

const WelcomeScreen = React.lazy(() => import("./components/welcomeScreen"));
const RestaurentScreen = React.lazy(() =>
  import("./components/restaurentScreen")
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userName = localStorage.getItem("USERNAME")
      ? JSON.parse(localStorage.getItem("USERNAME"))
      : null;

    const billingItems = localStorage.getItem("BILLINGITEMS")
      ? JSON.parse(localStorage.getItem("BILLINGITEMS"))
      : null;

    const consumeItems = localStorage.getItem("CONSUMEITEMS")
      ? JSON.parse(localStorage.getItem("CONSUMEITEMS"))
      : null;

    if (consumeItems?.length > 0) {
      dispatch({
        type: CHANGE_SCREEN,
        payload: {
          message: `Hi ${userName}, Select the Items from the menu`,
          userName,
        },
      });
      dispatch({
        type: CONSUME_ITEMS_RELOAD,
        payload: {
          consumeItems,
          billingItems,
          disableProceedToBillButton: false,
        },
      });
      return null;
    }

    if (billingItems?.length > 0) {
      dispatch({
        type: CHANGE_SCREEN,
        payload: {
          message: `Hi ${userName}, Select the Items from the menu`,
          userName,
        },
      });
      dispatch({
        type: PROCEED_TO_BILLING_RELOAD,
        billingItems,
      });
      return null;
    }

    if (userName) {
      dispatch({
        type: CHANGE_SCREEN,
        payload: {
          message: `Hi ${userName}, Select the Items from the menu`,
          userName,
        },
      });
    }
    return () => {};
  }, [dispatch]);

  const { changeScreen, message } = useSelector((state) => state.changeScreen);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              fontSize: "large",
              padding: "100px",
              fontWeight: "bold",
            }}
          >
            Loading....
          </div>
        }
      >
        <div className="App App-header">
          {!changeScreen && <WelcomeScreen></WelcomeScreen>}
          {changeScreen && (
            <RestaurentScreen message={message}></RestaurentScreen>
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
