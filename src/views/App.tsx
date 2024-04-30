import { FC, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./Home";
import Cards from "./Cards";
import Details from "./Details";
import Footer from "../components/Footer";
import { ThemeContext } from "../providers/Contexts";
import './../assets/style/main.scss';

const App: FC = () => {
  const [theme, setTheme] = useState<string>('dark');

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
            <Route path="/:type/:id" element={<Details />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;