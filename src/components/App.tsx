import { FC, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthContext } from "context/AuthContext";
import Session from "components/Session/Session";
import Main from "components/Main/Main";
import Settings from "components/Settings/Settings";
import GlobalStyles from "styles/global";

import { MainContainer } from "styles/mainLayout";

const App: FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <MainContainer>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/hall/:id" element={<Session />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainContainer>
      <GlobalStyles />
    </AuthContext.Provider>
  );
};

export default App;
