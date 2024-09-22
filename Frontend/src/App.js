import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@flaticon/flaticon-uicons/css/all/all.css";
import Navbar from "./component/Navbar";
// import AboutUs from "./component/aboutUs";
// import Product from "./component/product";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Main_Dashboard from "./component/Admin/Dashboard";
import Dashboard_2 from "./component/Customer/Dashboard2";
import UserProfile from "./component/Profile";
// import ProductList from "./component/ShowProduct";
// import ProductList2 from "./component/Product_List";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/*" element={<Navbar />} />
          <Route path="/profile" element={<UserProfile />} />
          {/* <Route path="/listproduct" element={<ProductList2 />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="Dashboard/*" element={<Main_Dashboard />} />
          <Route path="Dashboard2/*" element={<Dashboard_2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
