import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import UploadImage from "./pages/UploadImage/UploadImage";
import OurUsers from "./pages/OurUsers/OurUsers";
import UserProfile from "./pages/UserProfile/UserProfile";
import MyImages from "./pages/MyImages/MyImages";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload-image" element={<PrivateRoute />}>
            <Route path="/upload-image" element={<UploadImage />} />
          </Route>
          <Route path="/our-users" element={<OurUsers />} />
          <Route path="/our-users/:user" element={<UserProfile />} />
          <Route path="/my-images/" element={<PrivateRoute />}>
            <Route path="/my-images/" element={<MyImages />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
