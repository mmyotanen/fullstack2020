import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.value1} onChange={props.onChange1} />
      </div>
      <div>
        number: <input value={props.value2} onChange={props.onChange2} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <ul>
      {props.notesToShow.map((name) => (
        <li key={name.name}>
          {name.name} {name.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleAllChange = (event) => {
    console.log(event.target.value);
    setShowAll(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const noteObject = {
      name: newName,
      number: newNumber,
    };
    let onkoListassa = false;

    persons.forEach(function (item, index, array) {
      if (item.name === newName) {
        console.log(newName);
        onkoListassa = true;
      }
    });

    if (onkoListassa) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(noteObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const notesToShow = persons.filter((name) =>
    name.name.toLocaleLowerCase().includes(showAll.toLocaleLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={showAll} onChange={handleAllChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addName}
        value1={newName}
        onChange1={handleNameChange}
        value2={newNumber}
        onChange2={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons notesToShow={notesToShow} />
    </div>
  );
};

export default App;
