import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./Link.css";

export class ThemeLink extends PureComponent {
  render() {
    const { href, type, uppercase, children, ...rest } = this.props;

    return (
      <Link
        className={`link ${type || "primary"} ${uppercase && "uppercase"}`}
        to={href || "/"}
        {...rest}
      >
        {children}
      </Link>
    );
  }
}

export default ThemeLink;
