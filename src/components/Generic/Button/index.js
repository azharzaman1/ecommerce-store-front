import React, { PureComponent } from "react";
import "./Button.css";

export class Button extends PureComponent {
  render() {
    const {
      children,
      type = "primary",
      className,
      fluid,
      disabled,
      ...rest
    } = this.props;
    return (
      <button
        disabled={disabled}
        className={`button ${type} ${fluid && "fluid"} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
}

export default Button;
