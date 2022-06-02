import React, { PureComponent } from "react";
import { v4 } from "uuid";
import CartIcon from "../../assets/cart2.svg";
import { priceIdentifier } from "../../utils";
import { connect } from "react-redux";
import {
  SET_CURRENCY,
  PUSH_TO_CART,
  SET_CART,
} from "../../redux/slices/appSlice";
import { withReactRouterDom } from "../../HOCs/withReactRouterDom";
import "./PLPProductCard.css";

export class PLPProductCard extends PureComponent {
  render() {
    const { product, cart } = this.props;
    const alreadyPresentInCart =
      [...cart].findIndex((prod) => prod.id === product.id) > -1;

    return (
      <div className={`plp-product-card ${product.inStock && "instock"}`}>
        <div
          className={`plp-product-image-container ${
            !product.inStock && "select-none"
          }`}
          onClick={() =>
            this.props.reactRouterDom.navigate(
              `/category/clothes/product/${product.id}`
            )
          }
        >
          <img
            src={product.gallery[0]}
            alt="Product"
            className={`plp-product-card-image ${
              !product.inStock && "out-of-stock"
            }`}
          />
          {!product.inStock && (
            <div className="out-of-stock-watermark">OUT OF STOCK</div>
          )}
        </div>

        <div className="plp-product-cart-content">
          <h3
            className={`heading heading-text capitalize ${
              !product.inStock && "disabled"
            }`}
            onClick={() =>
              this.props.reactRouterDom.navigate(
                `/category/clothes/product/${product.id}`
              )
            }
          >
            {product.name}
          </h3>

          <h4
            className={`heading heading-text capitalize bold ${
              !product.inStock && "disabled"
            }`}
            onClick={() =>
              this.props.reactRouterDom.navigate(
                `/category/clothes/product/${product.id}`
              )
            }
          >
            {
              priceIdentifier(product.prices, this.props.currency).currency
                .symbol
            }
            {priceIdentifier(product.prices, this.props.currency).amount}
          </h4>

          <button
            disabled={alreadyPresentInCart}
            className="add-to-cart-button"
            onClick={
              product.attributes.length > 0
                ? // have attributes - direct to pdp
                  () => {
                    this.props.reactRouterDom.navigate(
                      `/category/clothes/product/${product.id}`
                    );
                  }
                : // have no attributes - add to cart
                  () => {
                    this.props.PUSH_TO_CART({
                      ...product,
                      uid: `product_${v4()}`,
                      qty: 1,
                      addedAt: new Date().toLocaleDateString(),
                    });
                  }
            }
          >
            <img src={CartIcon} alt="Cart Icon" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.appStore.currency,
  cart: state.appStore.cart,
});

const mapDispatchToProps = { SET_CURRENCY, PUSH_TO_CART, SET_CART };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withReactRouterDom(PLPProductCard));
