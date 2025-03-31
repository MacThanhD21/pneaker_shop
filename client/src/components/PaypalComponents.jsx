import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const convertVNDtoUSD = (vndAmount) => {
        const exchangeRate = 25000; // VND to USD exchange rate (update this as needed)
        return (vndAmount / exchangeRate).toFixed(2);
    };
    return (
        <div className="flex flex-col items-center">
            {isPending && <p>Loading PayPal...</p>}
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    const usdAmount = convertVNDtoUSD(amount);
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: "USD",
                                value: usdAmount,
                                breakdown: {
                                    item_total: {
                                      currency_code: "USD",
                                      value: usdAmount
                                    }
                                  }
                            }
                        }],
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    fetch("http://localhost:4000/verify-payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ orderID: order.id }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.verified) {
                                onSuccess(order);
                            } else {
                                onError("Payment verification failed");
                            }
                        })
                        .catch((err) => onError(err));
                }}
                onError={(err) => onError(err)}
            />
        </div>
    );
};

export default PayPalButton;
