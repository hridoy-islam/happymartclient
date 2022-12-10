import Admin from "../Layouts/Admin";
import Main from "../Layouts/Main";
import Blog from "../Pages/Blog/Blog";
import Category from "../Pages/Category/Category";
import AllBuyer from "../Pages/Dashboard/Admin/AllBuyer";
import AllSeller from "../Pages/Dashboard/Admin/AllSeller";
import Reported from "../Pages/Dashboard/Admin/Reported";
import MyOrders from "../Pages/Dashboard/Buyers/MyOrders";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CreatePost from "../Pages/Dashboard/Seller/CreatePost";
import MyBuyers from "../Pages/Dashboard/Seller/MyBuyers";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Error from "../Pages/Shared/Error";
import Signup from "../Pages/Signup/Signup";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/category/:id',
        element: <PrivateRoute><Category></Category></PrivateRoute>,
        loader: async({params}) => fetch(`${process.env.REACT_APP_API_URL}/category/${params.id}`),
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/blogs',
        element: <Blog></Blog>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Admin></Admin></PrivateRoute>,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
      },
      {
        path: '/dashboard/myorders',
        element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
      },
      {
        path: '/dashboard/createpost',
        element: <SellerRoute><CreatePost></CreatePost></SellerRoute>
      },
      {
        path: '/dashboard/myproducts',
        element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
      },
      {
        path: '/dashboard/mybuyers',
        element: <SellerRoute><MyBuyers></MyBuyers></SellerRoute>
      },
      {
        path: '/dashboard/allseller',
        element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
      },
      {
        path: '/dashboard/allbuyer',
        element: <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
      },
      {
        path: '/dashboard/reported',
        element: <AdminRoute><Reported></Reported></AdminRoute>
      },
    ]
  }
]);