import React, { PureComponent } from "react";
import { v4 } from "uuid";
import CartIcon from "../../assets/cart2.svg";
import { convertDecimals, priceIdentifier } from "../../utils";
import { connect } from "react-redux";
import {
  PUSH_TO_CART,
  SET_CART,
  PRODUCT_QUANTITY_INCREMENT,
} from "../../redux/slices/appSlice";
import { withReactRouterDom } from "../../HOCs/withReactRouterDom";
import "./PLPProductCard.css";

export class PLPProductCard extends PureComponent {
  render() {
    const {
      product,
      cart,
      currency,
      reactRouterDom,
      PUSH_TO_CART,
      PRODUCT_QUANTITY_INCREMENT,
    } = this.props;

    const alreadyPresentInCartIndex = cart.findIndex(
      (prod) => prod.id === product.id
    );

    return (
      <div className={`plp-product-card ${product.inStock && "instock"}`}>
        <div
          className={`plp-product-image-container ${
            !product.inStock && "select-none"
          }`}
          onClick={() =>
            reactRouterDom.navigate(`/category/clothes/product/${product.id}`)
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
            className={`heading heading-text capitalize plp-product-heading ${
              !product.inStock && "disabled"
            }`}
            onClick={() =>
              reactRouterDom.navigate(`/category/clothes/product/${product.id}`)
            }
          >
            {product.name} {product.brand}
          </h3>

          <h4
            className={`heading heading-text capitalize bold ${
              !product.inStock && "disabled"
            }`}
            onClick={() =>
              reactRouterDom.navigate(`/category/clothes/product/${product.id}`)
            }
          >
            {priceIdentifier(product.prices, currency).currency.symbol}
            {convertDecimals(
              priceIdentifier(product.prices, currency).amount,
              2
            )}
          </h4>

          <button
            className="add-to-cart-button"
            onClick={
              product.attributes.length > 0
                ? // have attributes - direct to pdp
                  () => {
                    reactRouterDom.navigate(
                      `/category/clothes/product/${product.id}`
                    );
                  }
                : // have no attributes - add to cart
                  () => {
                    if (alreadyPresentInCartIndex > -1) {
                      // already present in cart - just increase quantity
                      PRODUCT_QUANTITY_INCREMENT({
                        productID: cart[alreadyPresentInCartIndex].uid,
                      });
                    } else {
                      // adding for first time
                      PUSH_TO_CART({
                        ...product,
                        uid: `product_${v4()}`,
                        qty: 1,
                        addedAt: new Date().toLocaleDateString(),
                      });
                    }
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

const mapDispatchToProps = {
  PUSH_TO_CART,
  SET_CART,
  PRODUCT_QUANTITY_INCREMENT,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withReactRouterDom(PLPProductCard));
