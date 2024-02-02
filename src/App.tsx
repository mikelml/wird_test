import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/details";
import "./styles/index.scss";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/:id" Component={Details} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
