import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = (props) => {
  if (props.notesToShow.length === 1) {
    return (
      <div>
        <h2>{props.notesToShow[0].name}</h2>
        <p>Capital: {props.notesToShow[0].capital}</p>
        <p>Population: {props.notesToShow[0].population}</p>
        <h2>Languages</h2>
        <ul>
          {props.notesToShow[0].languages.map((name) => (
            <li key={name.name}>{name.name}</li>
          ))}
        </ul>
        <img
          src={props.notesToShow[0].flag}
          alt="Flag"
          width="200"
          height="100"
        />
        <h2>Weather in {props.notesToShow[0].name}</h2>
      </div>
    );
  }
  if (props.notesToShow.length > 10) {
    return <div>No feedbacks given</div>;
  }

  return (
    <ul>
      {props.notesToShow.map((name) => (
        <div key={name.name}>
          <li key={name.name}>{name.name}</li>
          <button onClick={() => props.setShowAll(name.name)} type="submit">
            show
          </button>
        </div>
      ))}
    </ul>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [showAll, setShowAll] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleAllChange = (event) => {
    console.log(event.target.value);
    setShowAll(event.target.value);
    console.log(countries);
  };

  const notesToShow = countries.filter((name) =>
    name.name.toLocaleLowerCase().includes(showAll.toLocaleLowerCase())
  );

  return (
    <div>
      find countries <input value={showAll} onChange={handleAllChange} />
      <Countries notesToShow={notesToShow} setShowAll={setShowAll} />
    </div>
  );
}

export default App;
