import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const initialPersons = useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then( response => {
      setPersons(response.data)
    })
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

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons([...persons, personObject]);
      setNewName("");
      setNewNumber("");
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
      <Person persons={persons} />
    </div>
  );
};

const Person = ({ persons }) =>
  persons.map((p) => {
    return (
      <p key={p.name}>
        {" "}
        {p.name} {p.number}{" "}
      </p>
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
