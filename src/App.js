import React, { PureComponent } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Generic/Header";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDisplayPage from "./pages/ProductDisplayPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OverlayWrapper from "./components/Generic/Overlay/OverlayWrapper";
import "./App.css";
class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <OverlayWrapper>
            <Routes>
              <Route path="/">
                <Route index element={<ProductListingPage />} />
                <Route path="category">
                  <Route index element={<Outlet />} />
                  <Route path=":categoryID">
                    <Route index element={<ProductListingPage />} />
                    <Route path="product">
                      <Route index element={<Outlet />} />
                      <Route
                        path=":productID"
                        element={<ProductDisplayPage />}
                      />
                    </Route>
                  </Route>
                </Route>

                <Route path="cart" element={<CartPage />} />

                <Route path="checkout" element={<CheckoutPage />} />
              </Route>
            </Routes>
          </OverlayWrapper>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
