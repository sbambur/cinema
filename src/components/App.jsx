import { Route, Routes } from "react-router-dom";
import Hall from "./Hall/Hall";
import { Main } from "./Main/Main";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/hall/:id" element={<Hall />} />
    </Routes>
  );
};

export default App;
