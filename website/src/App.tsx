import Navbar from "./Components/Navbar/Navbar.tsx";
import Footer from "./Components/Footer/Footer.tsx";

//todo: Navbar: Logo soll nicht responsive sein, Hamburgernavigation soll größer sein + Hover Effekt + Farbe
//todo: Startseite: dem FIGMA anpassen
//todo: Über uns: Bilder einfügen
//todo: Documents: Button Farbe ändern, Abschlusspräsentation einfügen
//todo: Installation: Bilder einfügen und links einfügen

const App = () => {

  return (
      <div className="App">
        <Navbar/>
        <Footer />
      </div>
  );
};

export default App;
