import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "https://ecom-store-backend.herokuapp.com/"
      : "http://localhost:4000/",
});
