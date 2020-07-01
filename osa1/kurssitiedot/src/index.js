import React from "react";
import ReactDOM from "react-dom";

const Part = (props) => {
  return (
    <div>
      Part {props.name}, number of exercises {props.count}
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <p>Course name {props.name}.</p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part name={props.name1} count={props.count1} />
      <Part name={props.name2} count={props.count2} />
      <Part name={props.name3} count={props.count3} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Total {props.count}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content
        name1={course.parts[0].name}
        count1={course.parts[0].exercises}
        name2={course.parts[1].name}
        count2={course.parts[1].exercises}
        name3={course.parts[2].name}
        count3={course.parts[2].exercises}
      />
      <Total
        count={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
