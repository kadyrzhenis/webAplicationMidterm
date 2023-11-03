import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
// import { MoviePage } from "./pages/MoviePage";

function App() {


  return (
    
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
      
          <Route path="/profile" element={<ProfilePage />} />

        </Routes>
      </div>

  );
}

export default App;