import { FC, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthContext } from "context/AuthContext";
import Hall from "components/Hall/Hall";
import Main from "components/Main/Main";
import MainLayout from "UI/MainLayout";

const App: FC = () => {
  const [auth, setAuth] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/hall/:id" element={<Hall />} />
        </Routes>
      </MainLayout>
    </AuthContext.Provider>
  );
};

export default App;
