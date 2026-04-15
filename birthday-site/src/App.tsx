import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetupPage from "./pages/setup/SetupPage";
import ViewPage from "./pages/view/Viewpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;