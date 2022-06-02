import React, { PureComponent } from "react";
import "./Container.css";

export class Container extends PureComponent {
  render() {
    const { maxWidth } = this.props;
    return (
      <div className="container">
        <div className="container-content" style={{ maxWidth: maxWidth }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Container;
