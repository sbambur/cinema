import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Hall from "./Hall/Hall";
import { Main } from "./Main/Main";

const App = () => {
  const [auth, setAuth] = useState();
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
