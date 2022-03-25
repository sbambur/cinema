import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import Hall from "./Hall/Hall";
import { Main } from "./Main/Main";

const App = () => {
  const [auth, setAuth] = useState(false);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/hall/:id" element={<Hall />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
