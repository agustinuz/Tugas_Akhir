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
import ProfilePage from "./component/Customer/Profile";
import ForgotPassword from "./component/Auth/forgotPassword";
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
// import UserProfile from "./component/ShoppingCard";
// import ProductList from "./component/ShowProduct";
// import ProductList2 from "./component/Product_List";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/*" element={<Navbar />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
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
