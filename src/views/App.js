import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./common/Navbar";
import Home from "./Home";
import Cards from "./Cards";
import Details from "./Details";
import Footer from "./Footer";
import { ThemeContext } from "../hooks/Contexts";


function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <Router>
      <div className={`app ${theme}`}>
          <ThemeContext.Provider value={[theme, setTheme]}>
            <Navbar />
          </ThemeContext.Provider>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:type" element={<Cards />} />
              <Route path="/:type" element={<Cards />} />
              <Route path="/:type" element={<Cards />} />
              <Route path="/:type/:id" element={<Details />} />
              <Route path="/:type/:id" element={<Details />} />
              <Route path="/:type/:id" element={<Details />} />
            </Routes>
          </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;