import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DaftarPage from "../pages/DaftarPage";
import LandingPage from "../pages/customer/LandingPage";
import CartPage from "../pages/customer/CartPage";
import DetailPage from "../pages/customer/DetailPage";
import OrderPage from "../pages/customer/OrderPage";
import StatusPage from "../pages/customer/StatusPage";
import FinishPage from "../pages/customer/FinishPage";

import Dashboard from "../pages/dashboard/Dashboard";
import Banner from "../pages/dashboard/banners/Banners";
import CreateBanners from "../pages/dashboard/banners/CreateBanners";
import EditBanners from "../pages/dashboard/banners/EditBanners";
import Brands from "../pages/dashboard/brands/Brands";
import CreateBrands from "../pages/dashboard/brands/CreateBrands";
import EditBrands from "../pages/dashboard/brands/EditBrands";
import Users from "../pages/dashboard/users/Users";
import CreateUsers from "../pages/dashboard/users/CreateUsers";
import EditUsers from "../pages/dashboard/users/EditUsers";
import Products from "../pages/dashboard/products/Products";
import CreateProducts from "../pages/dashboard/products/CreateProducts";
import EditProducts from "../pages/dashboard/products/EditProducts";

const RouteIndex = () => {
    return (
        <Routes>
            {/* =================route customer==================*/}
            <Route path='/' Component={LandingPage} />
            <Route path='/detail' Component={DetailPage} />
            <Route path='/login' Component={LoginPage} />
            <Route path='/daftar' Component={DaftarPage} />
            <Route path='/cart' Component={CartPage} />
            <Route path='/order' Component={OrderPage} />
            <Route path='/status' Component={StatusPage} />
            <Route path='/finish' Component={FinishPage} />
            {/* ================================================ */}

            {/* =================route dashboard================ */}
            <Route path="admin/dashboard" Component={Dashboard} />
            <Route path="admin/banners" Component={Banner} />
            <Route path="admin/banners/new" Component={CreateBanners} />
            <Route path="admin/banners/:id" Component={EditBanners} />

            <Route path="admin/brands" Component={Brands} />
            <Route path="admin/brands/new" Component={CreateBrands} />
            <Route path="admin/brands/:id" Component={EditBrands} />

            <Route path="admin/users" Component={Users} />
            <Route path="admin/users/new" Component={CreateUsers} />
            <Route path="admin/users/:id" Component={EditUsers} />

            <Route path="admin/products" Component={Products} />
            <Route path="admin/products/new" Component={CreateProducts} />
            <Route path="admin/products/:id" Component={EditProducts} />
            {/* ================================================ */}
        </Routes>
    );
}

export default RouteIndex;