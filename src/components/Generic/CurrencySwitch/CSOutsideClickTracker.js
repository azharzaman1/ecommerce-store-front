import React, { PureComponent } from "react";

class CSOutsideClickTracker extends PureComponent {
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
    const csDropdown = document.getElementById("select-options");
    const csAlreadyOpen = csDropdown.classList.contains("show");

    const closeCurrencySwitch =
      event.target.id !== "custom-switch-opener" &&
      event.target.id !== "select-options" &&
      event.target.id !== "select-selected" &&
      event.target.id !== "select-icon";

    if (csAlreadyOpen && closeCurrencySwitch) {
      // close custom switch
      this.props.toggleOptionsOpen();
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}

export default CSOutsideClickTracker;
