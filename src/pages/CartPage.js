import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CartProduct from "../components/Cart/CartProduct";
import Button from "../components/Generic/Button";
import Container from "../components/Generic/Layout/Container";
import { withReactRouterDom } from "../HOCs/withReactRouterDom";
import {
  calculateTax,
  convertDecimals,
  getCartTotal,
  getCartTotalProducts,
} from "../utils";
import "./CartPage.css";

export class CartPage extends PureComponent {
  componentDidMount() {
    document.title = "Cart - eCommerce Store Front";
  }

  render() {
    const cartTotals =
      this.props?.cart.length > 0 &&
      getCartTotal(this.props?.cart, this.props?.currency);
    const totalTax = cartTotals?.total
      ? parseFloat(calculateTax(cartTotals?.total, 21))
      : 0;
    return (
      <div className="cart-page">
        <Container maxWidth={1400}>
          <div className="page-content cart-page-content">
            <div className="page-header cart-page-header">
              <div className="cart-page-header-left">
                <h1 className="heading tertiary uppercase bold">Cart</h1>
              </div>
            </div>
            <div className="page-content-container cart-page-content-container">
              {this.props.cart?.length > 0 ? (
                <>
                  <div className="cart-page-products-container">
                    {this.props.cart.length > 0 &&
                      this.props.cart.map((product) => (
                        <CartProduct key={product.id} product={product} />
                      ))}
                  </div>
                  <div className="cart-page-calculations">
                    <div className="cart-page-calculations-col1">
                      <h4>Tax 21%:</h4>
                      <h4>Quantity</h4>
                      <h4>Total:</h4>
                    </div>
                    <div className="cart-page-calculations-col2">
                      <h5>
                        {cartTotals.currency.symbol}
                        {convertDecimals(totalTax, 2)}
                      </h5>
                      <h5>{getCartTotalProducts(this.props.cart)}</h5>
                      <h5>
                        {cartTotals.currency.symbol}
                        {convertDecimals(
                          totalTax + parseFloat(cartTotals.total),
                          2
                        )}
                      </h5>
                    </div>
                  </div>
                  <div className="cart-page-actions">
                    <Button
                      className="cart-page-actions-checkout"
                      onClick={() =>
                        this.props.reactRouterDom.navigate("/checkout")
                      }
                    >
                      Place Order
                    </Button>
                  </div>
                </>
              ) : (
                <div>Cart is empty</div>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.appStore.cart,
  currency: state.appStore.currency,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withReactRouterDom(CartPage));
