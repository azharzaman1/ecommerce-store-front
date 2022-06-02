import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  PRODUCT_QUANTITY_DECREMENT,
  PRODUCT_QUANTITY_INCREMENT,
  SET_PRODUCT,
} from "../../../redux/slices/appSlice";
import "./QuantityChanger.css";

export class QuantityChanger extends PureComponent {
  render() {
    const {
      qty,
      productID,
      className,
      product,
      disabled,
      onPdp,
      PRODUCT_QUANTITY_INCREMENT,
      PRODUCT_QUANTITY_DECREMENT,
      SET_PRODUCT,
    } = this.props;

    return (
      <div className={`quantity-changer ${className}`}>
        <button
          disabled={disabled}
          className="quantity-changer-button"
          onClick={
            onPdp
              ? // on product display page [modify product obj in store]
                () => {
                  SET_PRODUCT({
                    ...product,
                    qty:
                      !product.qty || product.qty === 1 ? 1 : product.qty - 1,
                  });
                }
              : // cart or minicart [modify product obj in cart]
                () => {
                  PRODUCT_QUANTITY_DECREMENT({
                    productID,
                  });
                }
          }
        >
          -
        </button>
        <span>{qty}</span>
        <button
          disabled={disabled}
          className="quantity-changer-button"
          onClick={
            onPdp
              ? () => {
                  SET_PRODUCT({
                    ...product,
                    qty: product.qty ? product.qty + 1 : 2,
                  });
                }
              : () =>
                  PRODUCT_QUANTITY_INCREMENT({
                    productID,
                  })
          }
        >
          +
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.appStore.cart,
  product: state.appStore.product,
});

const mapDispatchToProps = {
  PRODUCT_QUANTITY_INCREMENT,
  PRODUCT_QUANTITY_DECREMENT,
  SET_PRODUCT,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuantityChanger);
