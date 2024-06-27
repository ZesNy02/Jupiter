import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import AboutPage from "./pages/AboutPage/AboutPage.tsx";
import DocumentsPage from "./pages/DocumentsPage/DocumentsPage.tsx";
import InstalltionPage from "./pages/InstallationPage/InstallationPage.tsx";
import Navbar from "./Components/Navbar/Navbar.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import "./App.css";

//todo: Dokumente: Abschlusspräsentation einfügen
//todo: Installation: Bilder einfügen (Server) und links anpassen

const App = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/installation" element={<InstalltionPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
