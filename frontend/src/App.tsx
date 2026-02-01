import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages.tsx/Dashboard";
import { Signup } from "./pages.tsx/Signup";
import { Signin } from "./pages.tsx/Signin";
import { Landing } from "./pages.tsx/Landing";
import { Share } from "./pages.tsx/Share";

function App() {
  return (
    <div className="min-h-screen bg-transparent text-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share/:shareId" element={<Share />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
