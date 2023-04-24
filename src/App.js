import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import all the pages
import {
  HomePage,
  CategoryProduct,
  ProductSingle,
  Cart,
  Search,
  CheckoutPage
} from "./pages";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./store/store";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          <Sidebar />
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/product/:id" Component={ProductSingle} />
            <Route path="/category/:category" Component={CategoryProduct} />
            <Route path="/cart" Component={Cart} />
            <Route path="/search/:searchTerm" Component={Search} />
            <Route path="/checkout" Component={CheckoutPage} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
