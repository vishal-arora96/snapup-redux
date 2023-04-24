import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import all the pages
import {
  HomePage,
  CategoryProduct,
  ProductSingle,
  Cart,
  Search
} from "./pages";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./store/store";
import Sidebar from "./components/Sidebar/Sidebar";
import ProductSinglePage from "./pages/ProductSinglePage/ProductSinglePage";
import CategoryProductPage from "./pages/CategoryProductPage/CategoryProductPage";
import CartPage from "./pages/CartPage/CartPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Footer from "./components/Footer/Footer";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
//components

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          <Sidebar />
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/product/:id" Component={ProductSinglePage} />
            <Route path="/category/:category" Component={CategoryProductPage} />
            <Route path="/cart" Component={CartPage} />
            <Route path="/search/:searchTerm" Component={SearchPage} />
            <Route path="/checkout" Component={CheckoutPage} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
