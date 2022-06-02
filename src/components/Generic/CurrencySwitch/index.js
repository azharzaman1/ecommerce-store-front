import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { client } from "../../../qraphql/client";
import { GET_CURRENCIES } from "../../../qraphql/queries";
import { SET_CURRENCY } from "../../../redux/slices/appSlice";
import "./CurrencySwitch.css";

export class CurrencySwitch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currencies: [] };
  }

  componentDidMount() {
    client
      .query({ query: GET_CURRENCIES })
      .then((res) => {
        console.log("Currencies fetch response", res);
        this.setState({ currencies: res.data.currencies });
      })
      .catch((err) => console.error(err.message));
  }

  currencyChangeHandler = (e) => {
    this.props.SET_CURRENCY(e.target.value);
  };

  render() {
    if (this.state.currencies.length > 0) {
      return (
        <div className="currency-switch">
          <select
            name="currency-switch"
            id="currency-switch"
            value={this.props.currency}
            onChange={this.currencyChangeHandler}
          >
            {this.state.currencies.map((currency) => (
              <option key={currency.label} value={currency.label}>
                {currency.symbol} {currency.label}
              </option>
            ))}
          </select>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (state) => ({
  currency: state.appStore.currency,
});

const mapDispatchToProps = { SET_CURRENCY };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitch);
