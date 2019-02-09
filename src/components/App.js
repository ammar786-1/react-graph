import React from "react";
import Graph from "./Graph";

export default function App() {
  const data = {
    0: 100,
    1: 343,
    2: 454,
    3: 545,
    4: 655,
    5: 475,
    6: 555,
    7: 343,
    8: 303
  };
  return (
    <div className="App">
      <Graph data={data} />
    </div>
  );
}
