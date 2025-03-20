import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import Post1 from "./pages/posts/Post1";
import Post2 from "./pages/posts/Post2";
import Post3 from "./pages/posts/Post3";
import Post4 from "./pages/posts/Post4";
import Post5 from "./pages/posts/Post5";


function App() {
  return (<>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post1" element={<Post1 />} />
        <Route path="/post2" element={<Post2 />} />
        <Route path="/post3" element={<Post3 />} />
        <Route path="/post4" element={<Post4 />} />
        <Route path="/post5" element={<Post5 />} />
      </Routes>
    </Router>
  </>
  )
}

export default App
