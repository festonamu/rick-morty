import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./common/Navbar";
import Home from "./Home";
import Cards from "./Cards";
import Details from "./Details";
import Footer from "./Footer";
import { useState } from "react";
import { ThemeContext } from "../hooks/ThemeContext";


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
            <Route path="/characters" element={<Cards type="character" />} />
            <Route path="/locations" element={<Cards type="location" />} />
            <Route path="/episodes" element={<Cards type="episode" />} />
            <Route path="/characters/:id" element={<Details type="character" />} />
            <Route path="/locations/:id" element={<Details type="location" />} />
            <Route path="/episodes/:id" element={<Details type="episode" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;