import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/authContext";
import "./App.css";
import ContactUs from "./Components/ContactUs/ContactUs";
import LandingPage from "./Components/LandingPage/LandingPage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/SignUp";
import Features from "./Components/Features/Features";
import About from "./Components/About/About";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import Loading from "./Components/Loading/Loading";
import { useUserAuth, AuthProvider2 } from "./Components/contexts/authContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import UserDashboard from "./Components/UserDashboard/UserDashboard";

function AppContent() {
  const { role, login } = useAuth();
  const { isAuthenticated } = useUserAuth();
  const [loading, setLoading] = React.useState(true);
  const [showNavbarFooter, setShowNavbarFooter] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        await login();
      } catch (error) {
        console.error("Failed to fetch role:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();

    if (!loading) {
      if (role === "Admin" && location.pathname === "/adminlogin") {
        navigate("/admindashboard");
      } else if (role !== "Admin" && location.pathname.startsWith("/admin")) {
        navigate("/adminlogin");
      }
    }
  }, [login, location.pathname, role, navigate, loading]);

  useEffect(() => {
    const hidePaths = [
      "/admindashboard",
      "/feepaystatus",
      "/newentry",
      "/viewall",
      "/userdashboard",
    ];
    setShowNavbarFooter(!hidePaths.includes(location.pathname));
  }, [location.pathname, role, navigate, loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {showNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route
          path="/admindashboard"
          element={
            role === "Admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/adminlogin" />
            )
          }
        />
        <Route
          path="/userdashboard"
          element={
            isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/userdashboard" />
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/userdashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      {showNavbarFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AuthProvider2>
          <AppContent />
        </AuthProvider2>
      </AuthProvider>
    </Router>
  );
}

export default App;
