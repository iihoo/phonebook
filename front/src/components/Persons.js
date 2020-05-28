import React from 'react'
import './Components.css'

const Person = ({ person, deletePerson }) => {
    return (
        <React.Fragment>
            <tr>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td><button className="button" id={person.id} name={person.name} onClick={deletePerson}>delete</button></td>
            </tr>
        </React.Fragment>
    )
}

const Persons = ({ newName, newNumber, addPerson, handleNameChange, handleNumberChange, persons, handleDelete }) => {

    const personList = persons.map(person =>
        <Person key={person.id} person={person} deletePerson={handleDelete} />)

    return (
        <div className="grid-container">
            <div className="form">
                <h3>Add new person</h3>
                <form onSubmit={addPerson}>
                    <div>
                        <input value={newName} onChange={handleNameChange} placeholder="Name.." />
                    </div>
                    <div>
                        <input value={newNumber} onChange={handleNumberChange} placeholder="Number.." />
                    </div>
                    <div>
                        <button className="button" type='submit'>add</button>
                    </div>
                </form>
            </div>
            <div>
                <h3>Persons</h3>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>number</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personList}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Persons