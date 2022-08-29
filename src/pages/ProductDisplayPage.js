import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { v4 } from "uuid";
import Button from "../components/Generic/Button";
import Container from "../components/Generic/Layout/Container";
import AttributeSet from "../components/ProductsComponents/AttributeSet";
import QuantityChanger from "../components/ProductsComponents/QuantityChanger";
import { withReactRouterDom } from "../HOCs/withReactRouterDom";
import { client } from "../qraphql/client";
import { GET_PRODUCT_BY_ID } from "../qraphql/queries";
import {
  PUSH_TO_CART,
  SET_PRODUCT,
  PRODUCT_QUANTITY_INCREMENT,
} from "../redux/slices/appSlice";
import {
  convertDecimals,
  detectCartProductVariants,
  priceIdentifier,
  splitString,
} from "../utils";
import DOMPurify from "dompurify";
import { ReactComponent as Loader } from "../assets/loader.svg";
import "./ProductDisplayPage.css";

export class ProductDisplayPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      productLoading: true,
      errors: null,
      coverImage:
        "https://banksiafdn.com/wp-content/uploads/2019/10/placeholde-image.jpg",
      thumbnails: [],
      showFullDescription: false,
    };
  }
  componentDidMount() {
    client
      .query({
        query: GET_PRODUCT_BY_ID,
        variables: { productID: this.props.reactRouterDom.params.productID },
      })
      .then((res) => {
        console.log("Product fetch response", res);
        this.props.SET_PRODUCT(res.data.product);

        document.title = res.data.product.name
          ? `${res.data.product.name} - eCommerce Store Front`
          : "eCommerce Store Front";

        this.setState({
          product: res.data.product,
          productLoading: res.loading,
          error: res.errors,
          coverImage: res.data.product.gallery[0],
          showFullDescription:
            res.data.product.description.length < 500 ? true : false,
        });
      })
      .catch((err) => console.error(err));
  }
  render() {
    const {
      product,
      cart,
      currency,
      SET_PRODUCT,
      PUSH_TO_CART,
      PRODUCT_QUANTITY_INCREMENT,
    } = this.props;
    const { attributes } = product;

    if (this.state.productLoading) {
      return (
        <div className="content-center">
          <div className="loader">
            <Loader />
          </div>
        </div>
      );
    }

    if (this.state.errors) {
      return <div>Error: {JSON.stringify(this.state.errors)}</div>;
    }

    if (!product) {
      return <div>No Product found</div>;
    }

    const variantsInCartAlready = cart.filter((prod) => prod.id === product.id);

    const attributesSelectionsFiltered = product.attributes.map(
      (attr) => attr.selection && attr.selection
    );

    const attributesNotSelected =
      attributesSelectionsFiltered.filter(Boolean).length <
      product.attributes.length;

    const isUniqueVariant =
      variantsInCartAlready.length > 0 && !attributesNotSelected
        ? detectCartProductVariants(variantsInCartAlready, product)
        : false;

    return (
      <div className="products-listing-page">
        <Container maxWidth={1400}>
          <div className="pdp-content">
            <div className="pdp-left">
              <div className="pdp-gallery">
                <div className="pdp-gallery-thumbnails">
                  {this.state.product.gallery.length > 1 &&
                    this.state.product.gallery.map((thumbnail, i) => (
                      <img
                        key={thumbnail}
                        src={thumbnail}
                        alt="Product thumbnail"
                        onClick={() =>
                          this.setState((state) => ({
                            coverImage: thumbnail,
                          }))
                        }
                      />
                    ))}
                </div>
                <div className="pdp-gallery-cover">
                  <img src={this.state.coverImage} alt="" />
                </div>
              </div>
            </div>
            <div className="pdp-right">
              <div className="pdp-right-info">
                <h1 className="heading tertiary bold">{product.name}</h1>
                {product.brand && (
                  <h3 className="heading secondary pdp-right-info-brand">
                    {product.brand}
                  </h3>
                )}
              </div>
              {attributes.length > 0 && (
                <div className="pdp-right-attributes">
                  {attributes.map((attribute, index) => (
                    <AttributeSet
                      key={index}
                      index={index}
                      attribute={attribute}
                      uppercase
                      className="pdp-right-attribute"
                    />
                  ))}
                </div>
              )}

              <div className="pdp-right-price">
                <h4 className="heading price-label">PRICE:</h4>
                <h4 className="heading price">
                  {priceIdentifier(product.prices, currency).currency.symbol}
                  {convertDecimals(
                    priceIdentifier(product.prices, currency).amount,
                    2
                  )}
                </h4>
              </div>

              <div className="pdp-right-qty">
                <QuantityChanger
                  className="pdp-right-qty-changer"
                  qty={product.qty || 1}
                  productID={product.uid}
                  onPdp
                  disabled={!product.inStock}
                />
              </div>
              <div className="pdp-right-actions">
                <div>
                  <Button
                    disabled={attributesNotSelected || !product.inStock}
                    onClick={() => {
                      if (variantsInCartAlready.length > 0) {
                        // already present in cart
                        if (isUniqueVariant) {
                          const productID = `product_${v4()}`;
                          PUSH_TO_CART({
                            ...product,
                            uid: productID,
                            qty: product.qty || 1,
                            addedAt: new Date().toLocaleDateString(),
                          });
                          SET_PRODUCT({ ...product, uid: productID });
                        } else {
                          PRODUCT_QUANTITY_INCREMENT({
                            productID: product.uid,
                          });
                        }
                      } else {
                        // not present in cart already - first time
                        const productID = `product_${v4()}`;
                        PUSH_TO_CART({
                          ...product,
                          uid: productID,
                          qty: product.qty || 1,
                          addedAt: new Date().toLocaleDateString(),
                        });
                        SET_PRODUCT({ ...product, uid: productID });
                      }
                    }}
                    className="pdp-cart-button"
                  >
                    {!product.inStock ? "OUT OF STOCK" : "ADD TO CART"}
                  </Button>
                </div>
              </div>
              {product.description && (
                <div className="pdp-right-description">
                  <div
                    className="pdp-right-description-text"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        this.state.showFullDescription
                          ? product.description
                          : splitString(product.description, 500)
                      ),
                    }}
                  />
                  {!this.state.showFullDescription && (
                    <Button
                      type="text"
                      onClick={() =>
                        this.setState({ showFullDescription: true })
                      }
                    >
                      Read more
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.appStore.currency,
  product: state.appStore.product,
  cart: state.appStore.cart,
});

const mapDispatchToProps = {
  SET_PRODUCT,
  PUSH_TO_CART,
  PRODUCT_QUANTITY_INCREMENT,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withReactRouterDom(ProductDisplayPage));
