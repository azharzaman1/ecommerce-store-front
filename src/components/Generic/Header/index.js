import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withReactRouterDom } from "../../../HOCs/withReactRouterDom";
import { client } from "../../../qraphql/client";
import { GET_ALL_CATEGORIES } from "../../../qraphql/queries";
import { SET_MINICART_OPEN } from "../../../redux/slices/appSlice";
import { getCartTotalProducts } from "../../../utils";
import MiniCart from "../../Cart/MiniCart";
import CartOutsideTracker from "../../Cart/MiniCart/CartOutsideTracker";
import CurrencySwitch from "../CurrencySwitch";
import ThemeLink from "../Link";
import CartIcon from "../../../assets/cart.svg";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import Container from "../Layout/Container";
import "./Header.css";

export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { categories: [], minicartOpen: false };
  }

  componentDidMount() {
    // fetch nav links [cats]
    client
      .query({
        query: GET_ALL_CATEGORIES,
      })
      .then((res) => {
        this.setState({ categories: res.data.categories });
      })
      .catch((err) => console.error(err));

    // header scroll listener

    window.addEventListener("scroll", () => {
      if (window.scrollY > 25) {
        // down
        document.getElementById("header").classList.add("scrolled");
      } else {
        // up
        document.getElementById("header").classList.remove("scrolled");
      }
    });
  }

  render() {
    const { pathname } = this.props.reactRouterDom.location;
    return (
      <header className="header" id="header">
        <Container maxWidth={1400}>
          <div className="header-content-container">
            <div className="header-main">
              <div className="header-main-content">
                <div className="header-main-left">
                  <nav>
                    {this.state.categories.length > 0 ? (
                      this.state.categories.map((cat) => (
                        <div
                          key={cat.name}
                          className={`nav-link-container ${
                            pathname === `/category/${cat.name}`
                              ? "active"
                              : pathname === "/" && cat.name === "all"
                              ? "active"
                              : ""
                          }`}
                        >
                          <ThemeLink
                            key={cat.name}
                            uppercase
                            href={
                              cat.name === "all" ? `/` : `/category/${cat.name}`
                            }
                          >
                            {cat.name === "all" ? "Store" : cat.name}
                          </ThemeLink>
                        </div>
                      ))
                    ) : (
                      <div className="empty-nav-link-container">.</div>
                    )}
                  </nav>
                </div>
                <div className="header-main-center">
                  <Link to="/" className="link-unstyled">
                    <Logo />
                  </Link>
                </div>
                <div className="header-main-right">
                  <CurrencySwitch />
                  <div className="header-cart-container">
                    <img
                      src={CartIcon}
                      alt="Cart Icon"
                      className="header-cart-icon"
                      id="header-cart-icon"
                    />
                    {/* <CartIcon /> */}
                    {this.props.cart.length > 0 && (
                      <span>{getCartTotalProducts(this.props.cart)}</span>
                    )}
                  </div>
                  <CartOutsideTracker>
                    <MiniCart open={this.state.minicartOpen} />
                  </CartOutsideTracker>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.appStore.currency,
  cart: state.appStore.cart,
});

const mapDispatchToProps = { SET_MINICART_OPEN };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withReactRouterDom(Header));
