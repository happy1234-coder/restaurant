import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import {
  LEAVE_AND_RESET,
  LEAVE_AND_CHANGESCREEN,
} from "../actionTypes/placeOrderActionTypes";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "./css/modal.css";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function BillingModal() {
  const [payBill, setPayBill] = useState(false);
  const [inputAmount, setinputAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputTip, setinputTip] = useState("");
  const { billingItems } = useSelector((state) => state.placeOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    let errorTimeout = setTimeout(() => {
      setErrorMessage("");
    }, 4000);
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [errorMessage]);

  let subTotal = useMemo(
    () => billingItems.reduce((a, b) => Number(a) + Number(b.price), [0]),
    [billingItems]
  );
  let Tax = useMemo(() => Math.round(Number(subTotal * 0.05)), [subTotal]);
  let Total = useMemo(() => Number(Tax + subTotal), [Tax, subTotal]);

  function handlePayBillButton() {
    if (inputAmount < 0 || !/^\d+$/.test(inputAmount)) {
      setErrorMessage("Amount Should be > 0 and only contain numbers");
      return null;
    }

    if (inputAmount < Total) {
      console.log(inputAmount);
      setErrorMessage(`Pay ${Total}`);
      return null;
    }

    if (inputTip < 0 || !/^\d+$/.test(inputTip)) {
      setErrorMessage("Tip Should be > 0 and only contain numbers");
      return null;
    }

    let docDefinition = {
      content: [
        {
          text: "The BlackMoon Restaurent",
          style: "header",
        },
        {
          columns: [
            {
              width: "*",
              text: `RoadNo: 3,
                     Gandhi Nagar,
                     Hyderabad,Telangana-34276`,
            },
            {
              width: "*",
              text: `Date: ${new Date().toLocaleString()}`,
            },
          ],
        },
        " ",
        " ",
        {
          text: "Bill NO: 123454",
          style: "subheader",
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: [100, "*", "auto"],
            body: [
              ["Id", "Item", "Price"],
              ...[
                ...billingItems.map((item) => [
                  item.id,
                  item.name,
                  `$ ${item.price}`,
                ]),
              ],
            ],
            layout: "lightHorizontalLines",
          },
        },
        {
          columns: [
            {
              width: "*",
              text: `SubTotal`,
            },
            {
              width: "auto",
              text: `$ ${subTotal}`,
            },
          ],
        },
        {
          columns: [
            {
              width: "*",
              text: `Tax`,
            },
            {
              width: "auto",
              text: `$ ${Tax}`,
            },
          ],
        },
        {
          columns: [
            {
              width: "*",
              text: `Total`,
            },
            {
              width: "auto",
              text: `$ ${Total}`,
            },
          ],
        },
        {
          columns: [
            {
              width: "*",
              text: `Tip`,
            },
            {
              width: "auto",
              text: `$ ${inputTip}`,
            },
          ],
        },
        "\n\n\n",
        {
          text: "Thank YOU --- VISIT AGAIN",
          style: ["quote", "small"],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 8,
        },
      },
    };

    pdfMake.createPdf(docDefinition).download();
    localStorage.clear();
    dispatch({ type: LEAVE_AND_RESET });
    dispatch({ type: LEAVE_AND_CHANGESCREEN });
  }

  return (
    <div className="modal">
      <div className="modal-content">
        {console.log("rendering")}
        <h3>THE BLACKMOON RESTAURENT</h3>
        <hr />
        <div className="table_overFlow">
          <table>
            <thead>
              <th>Id</th>
              <th>Item</th>
              <th>Price</th>
            </thead>
            <tbody>
              {billingItems.map((item) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <span>SubTotal: {subTotal}</span>
        <span>Tax: {Tax}</span>
        <span>Total: {Total}</span>
        {!payBill && (
          <button
            type="button"
            onClick={() => {
              setPayBill((prevState) => !prevState.payBill);
            }}
          >
            Pay Bill
          </button>
        )}
        {payBill && (
          <div>
            <input
              type="text"
              value={inputAmount}
              onChange={(e) => setinputAmount(e.target.value)}
              placeholder="Enter amount"
            ></input>
            <input
              type="text"
              onChange={(e) => setinputTip(e.target.value)}
              value={inputTip}
              placeholder="Add Tip"
            ></input>
            <button type="button" onClick={handlePayBillButton}>
              Pay and Leave
            </button>
            <span style={{ fontSize: "12px", color: "red", padding: "10px" }}>
              {errorMessage}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DisplayBillingModal() {
  return (
    <div>
      {ReactDOM.createPortal(
        <BillingModal></BillingModal>,
        document.getElementById("modal")
      )}
    </div>
  );
}
