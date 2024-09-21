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
import Banners from "../pages/dashboard/banners/Banners";
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

import PrivateRoutes from "./PrivateRoutes";

const RouteIndex = () => {
    return (
        <Routes>
            <Route path='*' element={<h1>404 Not Found</h1>} />
            {/* =================route customer==================*/}
            <Route path='/' Component={LandingPage} />
            <Route path='/detail' Component={DetailPage} />
            <Route path='/cart' Component={CartPage} />
            <Route path='/order' Component={OrderPage} />
            <Route path='/status' Component={StatusPage} />
            <Route path='/finish' Component={FinishPage} />
            {/* ================================================ */}

            <Route path='/login' Component={LoginPage} />
            <Route path='/daftar' Component={DaftarPage} />
            {/* <Route path='admin/dashboard' Component={Dashboard} /> */}

            {/* =================route dashboard================ */}
            <Route
                path="/admin/dashboard"
                element={
                    <PrivateRoutes>
                        <Dashboard />
                    </PrivateRoutes>
                }
            />

            <Route path="admin/banners" element={<PrivateRoutes>
                <Banners />
            </PrivateRoutes>} />
            <Route path="admin/banners/new" element={<PrivateRoutes>
                <CreateBanners />
            </PrivateRoutes>} />
            <Route path="admin/banners/:id" element={<PrivateRoutes>
                <EditBanners />
            </PrivateRoutes>} />

            <Route path="admin/brands" element={<PrivateRoutes>
                <Brands />
            </PrivateRoutes>} />
            <Route path="admin/brands/new" element={<PrivateRoutes>
                <CreateBrands />
            </PrivateRoutes>} />
            <Route path="admin/brands/:id" element={<PrivateRoutes>
                <EditBrands />
            </PrivateRoutes>} />

            <Route path="admin/users" element={<PrivateRoutes>
                <Users />
            </PrivateRoutes>} />
            <Route path="admin/users/new" element={<PrivateRoutes>
                <CreateUsers />
            </PrivateRoutes>} />
            <Route path="admin/users/:id" element={<PrivateRoutes>
                <EditUsers />
            </PrivateRoutes>} />

            <Route path="admin/products" element={<PrivateRoutes>
                <Products />
            </PrivateRoutes>} />
            <Route path="admin/products/new" element={
                <PrivateRoutes>
                    <CreateProducts />
                </PrivateRoutes>} />
            <Route path="admin/products/:id" element={<PrivateRoutes>
                <EditProducts />
            </PrivateRoutes>} />
            {/* ================================================ */}
        </Routes>
    );
}

export default RouteIndex;