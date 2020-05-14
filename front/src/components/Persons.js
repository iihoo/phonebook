import React from 'react'
import Person from './Person'

const PersonList = (props) => {
    return props.persons.map(person =>
        <Person key={person.id} person={person} deletePerson={props.handleDelete} />)
}

const Persons = ({ newName, newNumber, addPerson, handleNameChange, handleNumberChange, persons, handleDelete }) => {
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
            <PersonList
                persons={persons} handleDelete={(event) => handleDelete(event)} />
        </div>
    )
}

export default Persons