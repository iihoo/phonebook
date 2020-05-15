import React from 'react'
import Person from './Person'

const PersonList = (props) => {
    return props.persons.map(person =>
        <Person key={person.id} person={person} />)
}

const Group = ({ group, deleteGroup }) => {
  return (
    <div>   
      ({group.id}) <b>Group name</b>: {group.name} <button id={group.id} name={group.name} onClick={deleteGroup}>delete </button>
      <PersonList persons={group.persons}/>
    </div>
  )
}

export default Group