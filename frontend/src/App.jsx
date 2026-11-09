import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Disclaimer from "./pages/Disclaimer";
import ReturnPolicy from "./pages/ReturnPolicy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import AddProduct from "./Admin/AddProduct.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import AdminOrders from "./Admin/AdminOrders.jsx";
import AdminProducts from "./Admin/AdminProduct.jsx";
import AdminUsers from "./Admin/AdminUsers.jsx";
import EditProduct from "./Admin/EditProduct.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/return" element={<ReturnPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
/*
 router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers);
router.post("/verify-otp", protect, verifyOtp);
*/
