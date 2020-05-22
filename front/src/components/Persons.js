import React from 'react'

const Person = ({ person, deletePerson }) => {
    return (
      <div>
        ({person.id}) <b>Name</b>: {person.name} <b>Number</b>: {person.number} <button id={person.id} name={person.name} onClick={deletePerson}>delete person?</button>
      </div>
    )
  }

const Persons = ({ newName, newNumber, addPerson, handleNameChange, handleNumberChange, persons, handleDelete }) => {

    const personList = persons.map(person =>
        <Person key={person.id} person={person} deletePerson={handleDelete} />)

    return (
        <div>
            <h3>Add new number</h3>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h3>Persons</h3>
            {personList}
        </div>
    )
}

export default Persons