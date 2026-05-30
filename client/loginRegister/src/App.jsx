import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import Navbars from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import About from "./pages/About";
import AIChatBox from "./components/AIChatBox";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navbars />
              <Home />
              <AIChatBox />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <Navbars />
              <MyBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <PrivateRoute>
              <Navbars />
              <About />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
