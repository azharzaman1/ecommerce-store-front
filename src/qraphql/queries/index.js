import { gql } from "apollo-boost";

export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_CATEGORY_BY_ID = gql`
  query ($input: String!) {
    category(input: { title: $input }) {
      name
      products {
        id
        name
        description
        category
        inStock
        brand
        gallery
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query ($productID: String!) {
    product(id: $productID) {
      id
      name
      description
      category
      inStock
      brand
      gallery
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
    }
  }
`;
