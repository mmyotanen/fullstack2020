import React from "react";

import "./App.css";
import Course from "./components/Course";

const App = ({ courses }) => {
  return (
    <div>
      <Course course={courses} />
    </div>
  );
};

export default App;
