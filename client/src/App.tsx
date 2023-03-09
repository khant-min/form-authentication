import Register from "./auth/Register";
import LogIn from "./auth/LogIn";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-teal-500 min-h-screen grid place-content-center">
      <Routes>
        <Route index element={<Register />} />
        <Route path="login" element={<LogIn />} />
      </Routes>
    </div>
  );
};

export default App;
