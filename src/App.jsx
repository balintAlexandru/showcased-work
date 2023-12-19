import { useState } from "react";

import Notepad from "./components/Notepad/Notepad";
import Control from "./components/Control/Control";

const App = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  console.log(portfolioData);
  return (
    <div className="app-wrapper">
      <Notepad portfolioData={portfolioData} />
      <Control
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />
    </div>
  );
};

export default App;
