import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Container from "../components/Generic/Layout/Container";
import PLPProductCard from "../components/ProductsComponents/PLPProductCard";
import { withReactRouterDom } from "../HOCs/withReactRouterDom";
import { client } from "../qraphql/client";
import { GET_CATEGORY_BY_ID } from "../qraphql/queries";
import { SET_CATEGORIES } from "../redux/slices/appSlice";
import { capitalizeString } from "../utils";
import { ReactComponent as Loader } from "../assets/loader.svg";
import "./ProductListingPage.css";

export class ProductListingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: null,
    };
    this.fetchCategory = this.fetchCategory.bind(this);
  }

  fetchCategory() {
    this.setState({ categoryIsLoading: true });
    const { params, location } = this.props.reactRouterDom;
    client
      .query({
        query: GET_CATEGORY_BY_ID,
        variables: {
          input: params.categoryID
            ? params.categoryID
            : location.pathname === "/"
            ? "all"
            : "",
        },
      })
      .then((res) => {
        console.log("Category(with products) fetch response ", res); // logging for debugging
        this.setState({
          category: res.data.category,
          categoryIsLoading: res.loading,
        });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    const { params, location } = this.props.reactRouterDom;
    document.title = params.categoryID
      ? `${capitalizeString(params.categoryID)} - eCommerce Store Front`
      : location.pathname === "/"
      ? `Store - eCommerce Store Front`
      : "eCommerce Store Front";

    this.fetchCategory();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.reactRouterDom.params.categoryID !==
      prevProps.reactRouterDom.params.categoryID
    ) {
      this.fetchCategory();
    }
  }

  render() {
    const { categoryID } = this.props.reactRouterDom.params;
    const { category } = this.state;

    if (this.state.categoryIsLoading) {
      return (
        <div className="content-center">
          <div className="loader">
            <Loader />
          </div>
        </div>
      );
    }

    if (!category) {
      return (
        <div className="content-center">
          {categoryID ? (
            <h1>{`${categoryID} category not found`}</h1>
          ) : this.props.reactRouterDom.location.pathname === "/" ? (
            <div className="loader">
              <Loader />
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div className="products-listing-page">
        <Container maxWidth={1390}>
          <div className="product-listing-page-content">
            <div className="page-header product-listing-page-header flex">
              <div className="listing-page-header-left">
                <h2 className="heading primary capitalize">
                  {category.name === "all" ? "Store" : category.name}
                </h2>
              </div>
            </div>
            <div className="page-content-container product-listing-page-container">
              {category.products.length > 0 ? (
                <div className="category-page-products-list product-listing-page-products-list">
                  {category.products.map((product) => (
                    <PLPProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div>No products found</div>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.appStore.categories,
});

const mapDispatchToProps = { SET_CATEGORIES };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withReactRouterDom(ProductListingPage));
