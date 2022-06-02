import React, { Component } from "react";

/**
 * Component that alerts if you click outside of it
 */
class CartOutsideTracker extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    const clickOnOpenButton = event.target.id === "header-cart-icon";
    const clickOnOverlay = event.target.id === "background-overlay";

    if (clickOnOpenButton) {
      document.getElementById("floating-minicart").classList.add("show");
      document.getElementById("background-overlay").classList.add("show");
      document.getElementById("app-body").classList.add("overflow-y-hidden");
    } else if (this.wrapperRef && clickOnOverlay) {
      document.getElementById("floating-minicart").classList.remove("show");
      document.getElementById("background-overlay").classList.remove("show");
      document.getElementById("app-body").classList.remove("overflow-y-hidden");
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}

export default CartOutsideTracker;
