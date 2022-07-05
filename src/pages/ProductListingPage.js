import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Container from "../components/Generic/Layout/Container";
import PLPProductCard from "../components/ProductsComponents/PLPProductCard";
import { withReactRouterDom } from "../HOCs/withReactRouterDom";
import { client } from "../qraphql/client";
import { GET_CATEGORY_BY_ID } from "../qraphql/queries";
import { SET_CATEGORIES } from "../redux/slices/appSlice";
import { capitalizeString } from "../utils";
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
          categoryIsLoading: true,
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
      : "Scandiweb PWA - eCommerce Store Front";

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
          <h1>{`Loading ...`}</h1>
        </div>
      );
    }

    if (!category) {
      return (
        <div className="content-center">
          <h1>
            {categoryID
              ? `"${categoryID}" category not found`
              : this.props.reactRouterDom.location.pathname === "/"
              ? "Loading... store"
              : ""}
          </h1>
        </div>
      );
    }

    return (
      <div className="products-listing-page">
        <Container maxWidth={1390}>
          <div className="product-listing-page-content">
            <div className="page-header product-listing-page-header flex">
              <div className="listing-page-header-left">
                <h2 className="heading primary capitalize">{category.name}</h2>
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
