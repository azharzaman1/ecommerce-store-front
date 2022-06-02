import React, { PureComponent } from "react";
import { client } from "../qraphql/client";
import { GET_ALL_CATEGORIES } from "../qraphql/queries";
import "./Homepage.css";

export class Homepage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { categories: null };
  }
  componentDidMount() {
    document.title = "eCommerce Store Front - Junior React Developer Test";
    client
      .query({
        query: GET_ALL_CATEGORIES,
      })
      .then((res) => {
        this.setState({ categories: res.data.categories }); // saving to state for local use
      })
      .catch((err) => console.error(err));
  }
  render() {
    return (
      <div className="homepage">
        <div className="homepage-content content-center">
          <h1>Homepage goes here</h1>
          {!this.state.categories && (
            <h3>Server not running, or running on port other than 4000</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Homepage;
