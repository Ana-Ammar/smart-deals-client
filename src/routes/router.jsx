import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import AllProducts from "../pages/allProducts/AllProducts";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRouter from "../provider/PrivateRouter";
import MyProducts from "../pages/myProducts/MyProducts";
import MyBids from "../pages/myBids/MyBids";
import ProductDetails from "../pages/product-details/ProductDetails";
import CreateProduct from "../pages/createProduct/CreateProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/my-products",
        element: (
          <PrivateRouter>
            <MyProducts />{" "}
          </PrivateRouter>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRouter>
            <MyBids />{" "}
          </PrivateRouter>
        ),
      },
      {
        path: "/product-details/:id",
        loader: ({params}) => fetch(`https://smart-deals-server-beige.vercel.app/products/${params.id}`),
        element: (
          <PrivateRouter>
            <ProductDetails />
          </PrivateRouter>
        ),
      },
      {
        path: "create-product",
        element: <PrivateRouter>
          <CreateProduct></CreateProduct>
        </PrivateRouter>
      }
    ],
  },
]);
