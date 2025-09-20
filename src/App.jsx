import { Routes, Route } from "react-router-dom";
// import FormPage from "./pages/FormPage";
import DetailsPage from "./pages/DetailsPage";
import FromPage from "./pages/FromPage";
import "./index.css"

function App() {
  return (
    // <div className="">hellow</div>
    <Routes>
      <Route path="/" element={<FromPage />} />
      <Route path="/9315868930" element={<DetailsPage />} />
    </Routes>
  );
}

export default App;
