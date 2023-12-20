import { useState } from "react";

import Notepad from "./components/Notepad/Notepad";
import Control from "./components/Control/Control";

const App = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div>
      <Notepad portfolioData={portfolioData} showSettings={showSettings} />
      <Control
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
    </div>
  );
};

export default App;
