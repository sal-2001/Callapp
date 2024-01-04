import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Inbox from "./pages/Inbox.js";
import Allcalls from "./pages/Allcalls.js";
import Archived from "./pages/Archived.js";
import Header from "./components/header/Header";
function App() {
  return (
    <Router className="app_container">
      <div className="max-w-[1440px] mx-auto bg-white container">
        <Header />
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/allcalls" element={<Allcalls />} />
          <Route path="/archived" element={<Archived />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
