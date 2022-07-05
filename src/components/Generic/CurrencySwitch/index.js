import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { client } from "../../../qraphql/client";
import { GET_CURRENCIES } from "../../../qraphql/queries";
import { SET_CURRENCY } from "../../../redux/slices/appSlice";
import CustomSelect from "../CustomSelect";
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
        const formatedCurrencies = [...res.data.currencies].map((curr, i) => ({
          key: i,
          dropdownDisplayValue: `${curr.symbol} ${curr.label}`,
          displayValue: curr.symbol,
          label: curr.label,
          symbol: curr.symbol,
        }));
        this.setState({ formatedCurrencies, currencies: res.data.currencies });
      })
      .catch((err) => console.error(err.message));
  }

  currencyChangeHandler = (index) => {
    this.props.SET_CURRENCY(this.state.currencies[index].label);
  };

  render() {
    if (this.state.currencies.length > 0) {
      return (
        <CustomSelect
          options={this.state.formatedCurrencies}
          onChangeHandler={this.currencyChangeHandler}
          defaultSelectIndex={this.state.currencies.findIndex(
            (curr) => curr.label === this.props.currency
          )}
          selectDropdownID="currency-switch-dropdown"
          selectOpenerID="currency-switch-opener"
        />
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
