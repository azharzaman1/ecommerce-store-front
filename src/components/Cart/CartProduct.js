import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { SET_CART } from "../../redux/slices/appSlice";
import { convertDecimals, priceIdentifier } from "../../utils";
import Button from "../Generic/Button";
import AttributeSet from "../ProductsComponents/AttributeSet";
import QuantityChanger from "../ProductsComponents/QuantityChanger";
import "./CartProduct.css";
import Gallery from "./ProductGallery";

export class CartProduct extends PureComponent {
  constructor(props) {
    super(props);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  handleRemoveFromCart() {
    const itemToRemoveUID = this.props.product.uid;
    const filteredCart = this.props.cart.filter(
      (product) => product.uid !== itemToRemoveUID
    );
    this.props.SET_CART(filteredCart);
  }

  render() {
    const { product, currency } = this.props;
    return (
      <div className="cart-product">
        <div className="cart-product-container">
          <div className="cart-product-left">
            <h2 className="heading tertiary bold cart-product-left-name">
              {product.name}
            </h2>
            <h3 className="heading secondary cart-product-brand">
              {product.brand}
            </h3>
            <div className="cart-product-price">
              <h3 className="heading price">
                {priceIdentifier(product.prices, currency).currency.symbol}
                {convertDecimals(
                  priceIdentifier(product.prices, currency).amount,
                  2
                )}
              </h3>
            </div>

            {product.attributes.length > 0 && (
              <div className="cart-product-left-attributes">
                {product.attributes.map((attribute, index) => (
                  <AttributeSet
                    key={index}
                    attribute={attribute}
                    index={index}
                    className="cart-product-attribute"
                    readOnly
                  />
                ))}
              </div>
            )}
            <div className="minicart-product-actions">
              <Button type="text" onClick={this.handleRemoveFromCart}>
                Remove from cart
              </Button>
            </div>
          </div>
          <div className="cart-product-right">
            <QuantityChanger
              className="cart-product-right-quantity"
              qty={product.qty}
              productID={product.uid}
              vertical
            />
            <div className="cart-product-right-gallery">
              <Gallery
                gallery={product.gallery}
                className="cart-page-right-gallery-carousal"
                controls
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.appStore.currency,
  cart: state.appStore.cart,
});
const mapDispatchToProps = { SET_CART };

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
