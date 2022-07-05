import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  PRODUCT_QUANTITY_DECREMENT,
  PRODUCT_QUANTITY_INCREMENT,
  SET_CART,
} from "../../../redux/slices/appSlice";
import { convertDecimals, priceIdentifier } from "../../../utils";
import Button from "../../Generic/Button";
import AttributeSet from "../../ProductsComponents/AttributeSet";
import QuantityChanger from "../../ProductsComponents/QuantityChanger";
import Gallery from "../ProductGallery";
import "./MinicartProduct.css";

export class Product extends PureComponent {
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
      <div className="minicart-product">
        <div className="minicart-product-left">
          <p className="text primary">{product.name}</p>
          <p className="text primary">{product.brand}</p>
          <p className="text primary bold">
            {priceIdentifier(product.prices, currency).currency.symbol}
            {convertDecimals(
              priceIdentifier(product.prices, currency).amount,
              2
            )}
          </p>
          {product.attributes.length > 0 && (
            <div className="minicart-product-attributes">
              {product.attributes.map((attribute, index) => (
                <AttributeSet
                  key={index}
                  index={index}
                  attribute={attribute}
                  smallSize
                  uppercase={false}
                  className="minicart-product-attribute"
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
        <div className="minicart-product-right">
          <QuantityChanger
            className="minicart-product-right-quantity"
            qty={product.qty}
            productID={product.uid}
            vertical
          />
          <Gallery
            gallery={product.gallery}
            className="minicart-product-right-gallery"
            small //small size carousal controls
            controlsOnHover // enables controls and on hover
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cart: state.appStore.cart,
});

const mapDispatchToProps = {
  PRODUCT_QUANTITY_INCREMENT,
  PRODUCT_QUANTITY_DECREMENT,
  SET_CART,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
