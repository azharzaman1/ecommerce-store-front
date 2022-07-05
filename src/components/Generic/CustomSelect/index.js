import React, { PureComponent } from "react";
import CSOutsideClickTracker from "../CurrencySwitch/CSOutsideClickTracker";
import "./CustomSelect.css";

export class CustomSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOptionsOpen: false,
      selectedOptionIndex: this.props.defaultSelectIndex || 0,
    };
    this.toggleOptionsOpen = this.toggleOptionsOpen.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  toggleOptionsOpen() {
    const cartOverlay = document.getElementById("floating-minicart");
    !cartOverlay.classList.contains("show") &&
      this.setState((state) => ({ isOptionsOpen: !state.isOptionsOpen }));
  }

  // handle keyboard navigation
  handleKeyDown = (index) => (e) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        this.setState({ selectedOptionIndex: index, isOptionsOpen: false });
        this.props.onChangeHandler(index);
        break;
      default:
        break;
    }
  };

  render() {
    const { options, onChangeHandler } = this.props;

    return (
      <CSOutsideClickTracker toggleOptionsOpen={this.toggleOptionsOpen}>
        <div className="select-wrapper">
          <div className="select-container">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={this.state.isOptionsOpen}
              className={`select-switch-button ${
                this.state.isOptionsOpen ? "expanded" : ""
              }`}
              onClick={this.toggleOptionsOpen}
              id="custom-switch-opener"
            >
              <span id="select-selected">
                {options[this.state.selectedOptionIndex].displayValue}
              </span>
              <span className="select-icon" id="select-icon">
                {this.state.isOptionsOpen ? (
                  <svg
                    width="8"
                    height="4"
                    viewBox="0 0 8 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    id="select-icon"
                  >
                    <path
                      d="M1 3.5L4 0.5L7 3.5"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    className="rotate-180"
                    width="8"
                    height="4"
                    viewBox="0 0 8 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    id="select-icon"
                  >
                    <path
                      d="M1 3.5L4 0.5L7 3.5"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </button>
            <ul
              id="select-options"
              className={`select-options ${
                this.state.isOptionsOpen ? "show" : ""
              }`}
              role="listbox"
              aria-activedescendant={String(
                options[this.state.selectedOptionIndex].dropdownDisplayValue
              )
                .replace(/\s+/g, "")
                .toLowerCase()}
              tabIndex={-1}
            >
              {options.map((option, index) => (
                <li
                  id={String(option.dropdownDisplayValue)
                    .replace(/\s+/g, "")
                    .toLowerCase()}
                  key={option.key}
                  role="option"
                  tabIndex={0}
                  aria-selected={this.state.selectedOptionIndex === option.key}
                  onKeyDown={this.handleKeyDown(option.key)}
                  onClick={() => {
                    this.setState({
                      selectedOptionIndex: option.key,
                      isOptionsOpen: false,
                    });
                    onChangeHandler(option.key);
                  }}
                >
                  {option.dropdownDisplayValue || option.displayValue}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CSOutsideClickTracker>
    );
  }
}

export default CustomSelect;
