import React, { useState, useEffect } from "react";

import personService from "./services/persons";
import "./index.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

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
        <button className="buttonAdd" type="submit">
          add
        </button>
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
          <button
            className="buttonRemove"
            onClick={() => {
              if (window.confirm(`Delete ${name.name} ?`)) {
                personService.deletePerson(name.id);
                props.setPersons(props.persons.filter((n) => n.id !== name.id));
                props.setErrorMessage(
                  `Person '${name.name}' removed from server`
                );
                setTimeout(() => {
                  props.setErrorMessage(null);
                }, 5000);
              }
            }}
          >
            delete
          </button>
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
  const [errorMessage, setErrorMessage] = useState(null);

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
    let id = 0;
    persons.forEach(function (item, index, array) {
      if (item.name === newName) {
        console.log(newName);
        onkoListassa = true;
        indeksi = index;
        id = item.id;
      }
    });

    if (onkoListassa) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, change number`
        )
      ) {
        personService.update(persons[indeksi].id, noteObject).catch((error) => {
          setErrorMessage(`Person ${newName} already deleted `);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((n) => n.id !== id));
        });
        setErrorMessage(`Person ${newName} new number is '${newNumber}' `);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        setPersons(
          persons.map((person) => (person.id !== id ? person : noteObject))
        );
      }
    } else {
      //setPersons(persons.concat(noteObject));
      setNewName("");
      setNewNumber("");
      personService
        .create(noteObject)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
        })
        .catch((error) => {
          // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
          console.log(error.response.data);
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      setErrorMessage(`Person ${newName} with number '${newNumber}' added `);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const notesToShow = persons.filter((name) =>
    name.name.toLocaleLowerCase().includes(showAll.toLocaleLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
      <Persons
        persons={persons}
        setPersons={setPersons}
        notesToShow={notesToShow}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
