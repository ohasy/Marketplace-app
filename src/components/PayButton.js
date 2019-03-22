import React from "react";
import { API } from "aws-amplify";
import StripeCheckOut from "react-stripe-checkout";
// import { Notification, Message } from "element-react";

const stripeConfig = {
  publishableApiKey: "pk_test_kXR3IVw66YTogwzjSI8xyTWE",
  currency: "USD"
};
const PayButton = ({ product, user }) => {
  let handleCharge = async token => {
    try {
      const result = await API.post("orderLambda", "/charge", {
        body: {
          token
        }
      });
      console.log({ result });
    } catch (err) {
      console.log(err);
    }
  };

  console.log("product.pri", product);
  return (
    <StripeCheckOut
      // panelLabel="panel label"
      token={handleCharge}
      email={user.attributes.email}
      name={product.description}
      image={"https://icon.now.sh/account_balance/f90"}
      // name={"Amplify Agora"}
      amount={parseFloat(product.price)}
      currency={stripeConfig.currency}
      stripeKey={stripeConfig.publishableApiKey}
      shippingAddress={product.shipped}
      billingAddress={product.shipped}
      locale="auto"
      allowRememberMe={false}
      zipCode
    />
  );
};

export default PayButton;
