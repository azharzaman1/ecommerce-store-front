import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { SET_PRODUCT } from "../../../redux/slices/appSlice";
import { replaceItemAtIndex } from "../../../utils";
import "./AttributeSet.css";

export class Attributes extends PureComponent {
  render() {
    const {
      attribute,
      index,
      product,
      className,
      smallSize,
      readOnly,
      SET_PRODUCT,
    } = this.props;
    const { items } = attribute;

    return (
      <div key={attribute.id} className={`attribute ${className}`}>
        <h4 className={`heading attribute-title ${smallSize && "small"}`}>
          {attribute.name}:
        </h4>
        <div className="attribute-items">
          {attribute.type === "text" ? (
            <div className="attribute-items-container">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`attribute-item-${attribute.type}`}
                >
                  <button
                    className={`${
                      attribute?.selection?.id === item.id && "selected"
                    } ${smallSize && "small"}`}
                    onClick={
                      readOnly
                        ? () => {}
                        : () => {
                            // in pdp
                            const initialAtrribute = product.attributes[index];
                            let modifiedAttribute = {
                              ...initialAtrribute,
                              selection: item,
                            };
                            SET_PRODUCT({
                              ...product,
                              attributes: replaceItemAtIndex(
                                product.attributes,
                                modifiedAttribute,
                                index
                              ),
                            });
                          }
                    }
                  >
                    {item.displayValue}
                  </button>
                </div>
              ))}
            </div>
          ) : attribute.type === "swatch" ? (
            <div className="attribute-items-container">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`attribute-item-${attribute.type} ${
                    attribute?.selection?.id === item.id && "selected"
                  } ${smallSize && "small"}`}
                  onClick={
                    readOnly
                      ? () => {}
                      : () => {
                          const initialAtrribute = product.attributes[index];
                          let modifiedAttribute = {
                            ...initialAtrribute,
                            selection: item,
                          };
                          SET_PRODUCT({
                            ...product,
                            attributes: replaceItemAtIndex(
                              product.attributes,
                              modifiedAttribute,
                              index
                            ),
                          });
                        }
                  }
                >
                  <button style={{ backgroundColor: item.value }} />
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.appStore.product,
});

const mapDispatchToProps = { SET_PRODUCT };

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
