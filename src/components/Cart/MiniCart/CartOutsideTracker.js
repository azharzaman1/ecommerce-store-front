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
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside(event) {
    const clickOnOpenButton =
      event.target.id === "header-cart-icon" ||
      event.target.id === "header-cart-badge";
    const clickOnOverlay = event.target.id === "background-overlay";
    const currencySwitchIsOpen = document
      .getElementById("select-options")
      .classList.contains("show");

    if (clickOnOpenButton && !currencySwitchIsOpen) {
      document.getElementById("floating-minicart").classList.add("show");
      document.getElementById("background-overlay").classList.add("show");
      document.getElementById("app-body").classList.add("overflow-y-hidden");
    } else if (this.wrapperRef && clickOnOverlay) {
      // click on overlay
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
