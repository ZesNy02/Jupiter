import Navbar from "./Components/Navbar/Navbar.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Document from "pages/Document.tsx";
import {useState} from "react";
import {Home} from "@mui/icons-material";

const App = () => {

  return (
      <div className="App">
        <Navbar />
        <Footer />
      </div>
  );
};

export default App;
