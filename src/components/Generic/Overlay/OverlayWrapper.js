import React, { PureComponent } from "react";
import "./OverlayWrapper.css";

export class OverlayWrapper extends PureComponent {
  render() {
    return (
      <div className="app-body" id="app-body">
        <div className="background-overlay" id="background-overlay"></div>
        {this.props.children}
      </div>
    );
  }
}

export default OverlayWrapper;
