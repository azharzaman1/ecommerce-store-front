import React, { PureComponent } from "react";
import "./Text.css";

export class Text extends PureComponent {
  render() {
    const { type = "primary", children, bold } = this.props;
    return <p className={`text ${type} ${bold && "bold"}`}>{children}</p>;
  }
}

export default Text;
