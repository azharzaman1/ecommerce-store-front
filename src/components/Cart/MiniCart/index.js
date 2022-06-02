import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { EMPTY_CART, SET_MINICART_OPEN } from "../../../redux/slices/appSlice";
import { withReactRouterDom } from "../../../HOCs/withReactRouterDom";
import MinicartProduct from "./MinicartProduct";
import Text from "../../Generic/Text";
import Button from "../../Generic/Button";
import { getCartTotal } from "../../../utils";
import "./MiniCart.css";

export class MiniCart extends PureComponent {
  render() {
    return (
      <div className="floating-minicart" id="floating-minicart">
        <div className="floating-minicart-panel">
          {this.props.cart?.length > 0 ? (
            <>
              {/* Header */}
              <div className="minicart-header">
                <div className="minicart-header-left">
                  <h2 className="heading heading-text bold capitalize">
                    My Bag: {this.props.cart.length} items
                  </h2>
                </div>
              </div>

              {/* Body */}

              <div className="minicart-products">
                {this.props.cart.map((product) => (
                  <MinicartProduct
                    key={product.id}
                    product={product}
                    currency={this.props.currency}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="minicart-footer">
                <div className="minicart-footer-calcs">
                  <div className="minicart-calcs-left">
                    <Text bold>Subtotal</Text>
                  </div>
                  <div className="minicart-calcs-right">
                    <Text type="title" bold>
                      {
                        getCartTotal(this.props.cart, this.props.currency)
                          .currency.symbol
                      }{" "}
                      {getCartTotal(this.props.cart, this.props.currency).total}
                    </Text>
                  </div>
                </div>
                <div className="minicart-footer-actions">
                  <Button
                    className="mini-cart-btn-cart"
                    type="secondary"
                    fluid
                    onClick={() => {
                      this.props.reactRouterDom.navigate("/cart");
                      // closes minicart
                      document
                        .getElementById("root")
                        .classList.remove("overflow-hidden");
                      document
                        .getElementById("floating-minicart")
                        .classList.remove("show");
                      document
                        .getElementById("background-overlay")
                        .classList.remove("show");
                    }}
                  >
                    VIEW BAG
                  </Button>

                  <Button
                    className="mini-cart-btn-checkout"
                    fluid
                    onClick={() => {
                      this.props.reactRouterDom.navigate("/checkout");
                      // closes minicart
                      document
                        .getElementById("root")
                        .classList.remove("overflow-hidden");
                      document
                        .getElementById("floating-minicart")
                        .classList.remove("show");
                      document
                        .getElementById("background-overlay")
                        .classList.remove("show");
                    }}
                  >
                    CHECKOUT
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-minicart-tagline">
              <h3 className="heading secondary">Your bag is empty</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  miniCartOpen: state.appStore.miniCartOpen,
  cart: state.appStore.cart,
  currency: state.appStore.currency,
});

const mapDispatchToProps = { SET_MINICART_OPEN, EMPTY_CART };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withReactRouterDom(MiniCart));
