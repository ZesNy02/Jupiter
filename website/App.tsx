import "./App.css";
import Navbar from "./Components/Navbar/Navbar.tsx";

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './Header.tsx';
// import Footer from './Footer.tsx';
// import About from './About.tsx';
// import Installation from './Installation.tsx';
// import Start from './Start.tsx';
// import Document from './Document.tsx';

// // const App: React.FC = () => {
// //   return (
// //     <Router>
// //       <Header />
// //       <div>
// //         <Routes>
// //         <Route path="/Start" element={<Start />} />
// //         <Route path="/installation" element={<Installation />} />
// //         <Route path="/document" element={<Document />} />
// //         <Route path="/about" element={<About />} />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;

// const App = () => {
//   return (
//     <Router>
//       <div className="app">
//         <Header />
//         <div className="content">
//           <Routes>
//             <Route path="/Start" element={<Start />} />
//             <Route path="/installation" element={<Installation />} />
//             <Route path="/document" element={<Document />} />
//             <Route path="/about" element={<About />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
