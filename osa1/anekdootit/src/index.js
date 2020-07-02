import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const App = (props) => {
  const randomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  let lista = new Array(anecdotes.length - 1).fill(0);
  //console.log(lista);
  let number = 0;
  const [selected, setSelected] = useState(randomNumber(anecdotes.length - 1));
  const [allClicks, setAll] = useState([...lista]);

  while (number === selected) {
    number = getRandomInt(anecdotes.length - 1);
  }

  let copy = [...allClicks];
  let suurin = 0;
  let indeksi = 0;
  for (let i = 0; i < 5; i++) {
    if (suurin < allClicks[i]) {
      suurin = allClicks[i];
      indeksi = i;
    }
  }
  const handleLeftClick = () => {
    copy[selected] += 1;
    setAll([...copy]);
    console.log(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {allClicks[selected]} votes</p>
      <Button handleClick={() => handleLeftClick()} text={"vote"} />
      <Button handleClick={() => setSelected(number)} text={"next anekdote"} />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[indeksi]}</p>
      <p>has {allClicks[indeksi]} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
