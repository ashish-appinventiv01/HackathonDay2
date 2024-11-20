import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import loading from "../src/assets/loading.png";
import "./App.css";
import Select from "react-select";
import Quiz from "./components/quiz/quiz";


function App() {
  const [count, setCount] = useState(0);
  const [levelType, setLevelType] = useState(null);

  const options = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];
  // console.log("><><><<><><><><<><><<", levelType);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
        </a>
        {levelType != null ? null : (
          <a href="https://react.dev" target="_blank">
            <img src={loading} className="logo react" alt="React logo" />
          </a>
        )}
        
        <h3>Select your Level</h3>
        <Select
          style={{ width: "1000px", color: "black", backgroundColor: "black" }}
          onChange={(e) => {
            setLevelType(e.value);
            // console.log(">>>>>", e.value)
            e.value == 'Easy' && setCount(100);
            e.value == 'Medium' && setCount(1000);
            e.value == 'Hard' && setCount(10000);

          }}
          options={options}
        > Select Your Level</Select>
        <div>
           {levelType != null ? <Quiz levelType={levelType} count={count}/> : null}
        </div>
      </div>
    </>
  );
}

export default App;
