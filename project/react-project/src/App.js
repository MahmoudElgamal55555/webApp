import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignUp from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/Login";
import Dashboard from "./DashBoard/Dashboard";
import Users from "./DashBoard/Users/Users";
import UpdateUser from "./DashBoard/Users/UpdateUser";
import CreateNewUser from "./DashBoard/Users/CreateNewUser";
import Products from "./DashBoard/Products/Products";
import UserProvider from "./Components/UserContext";
import RequireAuth from "./Pages/Auth/RequireAuth";
import PersistLogin from "./Pages/Auth/PersistLogin";
import CreateNewProduct from "./DashBoard/Products/CreateNewProduct";
import UpdateProduct from "./DashBoard/Products/UpdateProduct";



export default function App() {
  return (
    <div>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/registar" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* protected route */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />} >
              <Route path="/dashboard" element={<Dashboard />} >
                <Route path="users" element={< Users />} />
                <Route path="createNewUser" element={< CreateNewUser />} />
                <Route path="users/:id" element={<UpdateUser />} />
                <Route path="products" element={<Products />} />
                <Route path="createNewProducts" element={<CreateNewProduct />} />
                <Route path="products/:id" element={<UpdateProduct />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

