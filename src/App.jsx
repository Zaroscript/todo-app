import React from "react";
import "./App.scss";
import Todos from "./Todos";
import { selectTheme } from "./features/slices/themeSlice";
import { useSelector } from 'react-redux';
function App() {

  const dark = useSelector(selectTheme);
  return (
    <div className={`app ${!dark ? "light" : ''}`}>
      <div className="header"></div>

      <Todos />
    </div>
  );
}

export default App;
