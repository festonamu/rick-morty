import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./common/Navbar";
import Home from "./Home";
import Cards from "./Cards";
import Details from "./Details";
import Footer from "./Footer";
import { useState } from "react";
import { ThemeContext, TypeContext } from "../hooks/Contexts";


function App() {
  const [theme, setTheme] = useState('dark');
  const [type, setType] = useState();

  return (
    <Router>
      <div className={`app ${theme}`}>
        <TypeContext.Provider value={[type, setType]}>
          <ThemeContext.Provider value={[theme, setTheme]}>
            <Navbar />
          </ThemeContext.Provider>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/character" element={<Cards />} />
              <Route path="/location" element={<Cards />} />
              <Route path="/episode" element={<Cards />} />
              <Route path="/character/:id" element={<Details />} />
              <Route path="/location/:id" element={<Details />} />
              <Route path="/episode/:id" element={<Details />} />
            </Routes>
          </div>
        </TypeContext.Provider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;