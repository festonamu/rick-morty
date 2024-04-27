import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./common/Navbar";
import Home from "./Home";
import Characters from "./Characters";
import Locations from "./Locations";
import Episodes from "./Episodes";
import Footer from "./common/Footer";

function App() {
  return (
    <Router>
      <div className="App">
          <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters/>} />
            <Route path="/locations" element={<Locations/>} />
            <Route path="/episodes" element={<Episodes/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;