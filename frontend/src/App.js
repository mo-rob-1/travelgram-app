import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import UploadImage from "./pages/UploadImage/UploadImage";
import OurUsers from "./pages/OurUsers/OurUsers";
import UserProfile from "./pages/UserProfile/UserProfile";
import MyImages from "./pages/MyImages/MyImages";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ScrollButton from "./components/ScrollButton/ScrollButton";
import GlobalStyle from "./styles/Global";
import { Container } from "./styles/Container.styled";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
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
        </Container>
      </Router>
      <ScrollButton />
      <ToastContainer />
    </>
  );
}

export default App;
