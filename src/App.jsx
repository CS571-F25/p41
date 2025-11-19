import { HashRouter, Route, Routes } from "react-router";
import "./styles/App.css";
import Home from "../src/pages/Home";
import AboutMe from "../src/pages/AboutMe";
import NavBar from "./components/NavBar";
import Features from "../src/pages/Features";
import Mixer from "./pages/Mixer";
import Focus from "./pages/Focus";

function App() {
  return (
    <>
      <NavBar />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<AboutMe />}></Route>
          <Route path="/features" element={<Features />}></Route>
          <Route path="/mixer" element={<Mixer />}></Route>
          <Route path="/focus" element={<Focus />}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
