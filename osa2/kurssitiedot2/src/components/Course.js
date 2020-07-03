import React from "react";

const Course = (props) => {
  return (
    <div>
      <ul>
        {props.course.map((course) => (
          <li key={course.id}>
            <Header name={course.name} />
            <Content course={course} />
            <Total course={course} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Total = ({ course }) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0);

  return <p>Number of exercises {total}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <ul>
        {props.course.parts.map((course) => (
          <li key={course.id}>
            <Part part={course} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
