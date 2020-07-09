import React, { useState, useEffect } from "react";

import personService from "./services/persons";

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
        <button onClick={() => console.log("painoin")} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <ul>
        {props.notesToShow.map((name) => (
          <li key={name.name}>
            {name.name} {name.number}
            <button
              onClick={() => {
                if (window.confirm(`Delete ${name.name} ?`)) {
                  personService.deletePerson(name.id);
                }
              }}
              type="submit"
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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
    let indeksi = 0;
    persons.forEach(function (item, index, array) {
      if (item.name === newName) {
        console.log(newName);
        onkoListassa = true;
        indeksi = index;
      }
    });

    if (onkoListassa) {
      if (window.confirm(`${newName} is already added to phonebook`)) {
        personService.update(persons[indeksi].id, noteObject);
        console.log(newName + "hei");
        setNewName("1");
      }
    } else {
      setPersons(persons.concat(noteObject));
      setNewName("");
      setNewNumber("");
      personService.create(noteObject);
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
