import React, { useState } from 'react'
import './Components.css'

const Person = ({ person }) => {
    return (
        <React.Fragment>
            <tr>
                <td></td>
                <td colSpan="2">{person.name}</td>
            </tr>
        </React.Fragment>
    )
}

const Group = ({ group, deleteGroup }) => {
    const [personsVisible, setPersonsVisible] = useState(false)

    const showPersons = () => {
        if (personsVisible === false) {
            setPersonsVisible(true)
        } else {
            setPersonsVisible(false)
        }
    }

    const personList = group.persons.map(person =>
        <Person key={person.id} person={person} />)

    return (
        <React.Fragment>
            <tr>
                <td>{group.id}</td>
                <td className="tooltip"><button className="button-group-name" onClick={() => showPersons()}>{group.name}</button><span className="tooltiptext">Show persons</span></td>
                <td>{group.persons.length}</td>
                <td><button className="button" id={group.id} name={group.name} onClick={deleteGroup}>delete</button></td>
            </tr>
            {personsVisible === true && personList}
        </React.Fragment>
    )
}

const Groups = ({ newGroupName, addGroup, handleGroupNameChange, groups, handleGroupDelete }) => {

    const groupList = groups.map(group =>
        <Group key={group.id} group={group} deleteGroup={handleGroupDelete} />)

    return (
        <div className="grid-container">
            <div className="form">
                <h3>Add new group</h3>
                <form onSubmit={addGroup}>
                    <div>
                        <input value={newGroupName} onChange={handleGroupNameChange} placeholder="Group name.." />
                    </div>
                    <div>
                        <button className="button" type='submit'>add</button>
                    </div>
                    <br />
                </form>
            </div>
            <div>
                <h3>Groups</h3>
                <table>
                    <thead>
                        <tr>
                            <th>id</th><th>name</th><th>persons</th><th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupList}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Groups