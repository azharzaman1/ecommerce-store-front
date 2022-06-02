import React, { PureComponent } from "react";

export class CheckoutPage extends PureComponent {
  componentDidMount() {
    document.title = `Checkout - eCommerce Store Front`;
  }
  render() {
    return (
      <div className="checkout">
        <div className="checkout-content content-center">
          <h1>Checkout page goes here</h1>
        </div>
      </div>
    );
  }
}

export default CheckoutPage;
