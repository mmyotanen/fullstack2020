import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = (props) => {
  if (props.notesToShow.length === 1) {
    console.log(props.notesToShow[0].languages);
    return (
      <div>
        <h2>{props.notesToShow[0].name}</h2>
        <p>{props.notesToShow[0].capital}</p>
        <p>{props.notesToShow[0].population}</p>
        <h2>Languages</h2>
        <ul>
          {props.notesToShow[0].languages.map((name) => (
            <li key={name.name}>{name.name}</li>
          ))}
        </ul>
        <img src={props.notesToShow[0].flag} alt="Flag" />
      </div>
    );
  }
  if (props.notesToShow.length > 10) {
    return <div>No feedbacks given</div>;
  }

  return (
    <ul>
      {props.notesToShow.map((name) => (
        <form onSubmit={props.onSubmit}>
          <div key={name.name}>
            <li key={name.name}>{name.name}</li>
            <button type="submit">show</button>
          </div>
        </form>
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

  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setCountries(event.target.value);
  };

  const handleAllChange = (event) => {
    console.log(event.target.value);
    setShowAll(event.target.value);
    console.log(countries);
  };

  const notesToShow = countries.filter((name) =>
    name.name.toLocaleLowerCase().includes(showAll.toLocaleLowerCase())
  );

  const yksi = (event) => {
    event.preventDefault();

    notesToShow.filter((name) => name);
    console.log(notesToShow);
  };

  return (
    <div>
      find countries <input value={showAll} onChange={handleAllChange} />
      <Countries notesToShow={notesToShow} onSubmit={yksi} />
    </div>
  );
}

export default App;
