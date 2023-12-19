import { useState, useEffect } from "react";
import axios from "axios";
import personsService from "./services/persons";

const App = () => {
  const initialPersons = useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const searchText = event.target.value.toLowerCase();

    if (!searchText) {
      setPersons(initialPersons); // Reset to the original list
    } else {
      const filteredPeople = initialPersons.filter((p) =>
        p.name.toLowerCase().includes(searchText)
      );
      setPersons(filteredPeople);
    }
  };

  const addPerson = event => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(person => person.name === newName);
    // Update person if newName already exists, otherwise add new person
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personsService
        .update(existingPerson.id, newPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
        })
      }
    } else {
      personsService.create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  const delPerson = (id) => {
    const personToDelete = persons.find((p)=>p.id === id)
    if (window.confirm(`Delete ${personToDelete.name}`)){
      personsService.remove(id).then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>filter shown with <input value={search} onChange={handleSearch} /></div> */}
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      {/* <form>
        <div>name: <input value={newName} onChange={handleNewName} /></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
        <div><button type="submit" onClick={addPerson}>add</button></div>
      </form> */}
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Person persons={persons} delPerson={delPerson}/>
    </div>
  );
};

const Person = ({ persons, delPerson }) =>
  persons.map((p) => {
    return (
      <>
        <p key={p.id}>
          {" "}
          {p.name} {p.number}{" "}
          <button onClick={()=>delPerson(p.id)}>Delete</button>
        </p>
      </>
    );
  });

const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={handleSearch} />
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
  addPerson,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};
export default App;
