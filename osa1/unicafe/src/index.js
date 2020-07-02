import React, { useState } from "react";
import ReactDOM from "react-dom";

const Display = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  let sum = props.good + props.bad + props.neutral;
  let avg = (props.good + props.bad * -1) / sum;
  let positive = (100 / sum) * props.good;
  let avg2 = (Math.round(avg * 10) / 10).toFixed(1);
  let positive2 = Math.round(positive * 10) / 10 + " %";
  if (sum === 0) {
    return <div>No feedbacks given</div>;
  }
  return (
    <React.Fragment>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>
              <StatisticsLine value={props.good} />
            </td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>
              <StatisticsLine value={props.neutral} />
            </td>
          </tr>
          <tr>
            <td>bad</td>
            <td>
              <StatisticsLine value={props.bad} />
            </td>
          </tr>
          <tr>
            <td>all</td>
            <td>
              <StatisticsLine value={sum} />
            </td>
          </tr>
          <tr>
            <td>average</td>
            <td>
              <StatisticsLine value={avg2} />
            </td>
          </tr>
          <tr>
            <td>positive</td>
            <td>
              <StatisticsLine value={positive2} />
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

const StatisticsLine = (props) => {
  return <div>{props.value}</div>;
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Display text={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Display text={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
