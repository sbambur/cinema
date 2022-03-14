import React from "react";
import Hall from "./Hall";
import Statistic from "./Statistic";

const App = () => {
  return (
    <div className="container">
      <Hall title="Викинги 3" date="20.03.2022" />
      <Statistic />
    </div>
  );
};

export default App;
