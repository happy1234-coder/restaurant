import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CHANGE_SCREEN } from "../actionTypes/placeOrderActionTypes";
import "./css/welcomeScreen.css";

export const WelcomeScreen = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let errorTimeOut = setTimeout(() => {
      setErrorMessage("");
    }, 3000);
    return () => {
      clearTimeout(errorTimeOut);
    };
  }, [errorMessage]);

  //Checking the name state value is not null
  //, if so display error message for 3 seconds

  const handleButtonClick = () => {
    if (!name.trim() || !/^[a-zA-Z]+$/.test(name)) {
      setErrorMessage("Name Shouldn't be Empty and contains only characters");

      return null;
    }

    localStorage.setItem("USERNAME", JSON.stringify(name));

    dispatch({
      type: CHANGE_SCREEN,
      payload: {
        message: `Hi ${name}, Select the Items from the menu`,
        userName: name,
      },
    });
  };

  return (
    <div>
      <div className="header">
        <h1>Welcome to the Restuarent</h1>
        {/* Takes user name */}
        <input
          className="input"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="button" type="button" onClick={handleButtonClick}>
          {" "}
          Enter Restaurent
        </button>
        {errorMessage && (
          <p
            style={{
              color: "black",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "0",
            }}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
