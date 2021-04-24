// import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Inventory from "./components/Inventory/Inventory";
import Login from "./components/Login/Login";
import NotFound from "./components/Notfound/NotFound";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Review from "./components/Review/Review";
import Shipment from "./components/Shipment/Shipment";
import Shop from "./components/Shop/Shop";

function App() {
  return (
    <div className="App">
      <div>
        <Header></Header>

        <Router>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/manage_inventory">
              <Inventory></Inventory>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/shipment">
              <Shipment></Shipment>
            </Route>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route  path="/product/:productkey">
             <ProductDetail></ProductDetail>
            </Route>
            <Route  path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
