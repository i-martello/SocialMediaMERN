import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ImgDetails from "./pages/ImgDetails";
import ImgForm from "./pages/ImgForm";
import ImgGallery from "./pages/ImgGallery";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import { useCallback, useEffect } from "react";
import { useGlobalContext } from "./context";

function App() {
  const { session } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

  const validation = useCallback(() => {
    if (!session && location.pathname === "/publicar") {
      navigate("/login");
    } else if(session && (location.pathname === "/login" || location.pathname=== "/register")){
      navigate("/")
    }
  }, [location.pathname, navigate, session]);

  useEffect(() => {
    validation();
  }, [validation]);

  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<ImgGallery />}></Route>
        <Route path="/imagenes/:id" element={<ImgDetails />}></Route>
        <Route path="/publicar" element={<ImgForm />}></Route>
        <Route path="/registro" element={<SingUp />}></Route>
        <Route path="/login" element={<SingIn />}></Route>
      </Routes>
    </main>
  );
}

export default App;
