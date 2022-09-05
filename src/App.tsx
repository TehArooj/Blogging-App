import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import ViewBlog from "./pages/ViewBlog";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/viewblog" element={<ViewBlog />} />
      </Routes>
    </div>
  );
}

export default App;
