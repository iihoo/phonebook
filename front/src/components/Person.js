import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      ({person.id}) <b>Name</b>: {person.name} <b>Number</b>: {person.number} <button id={person.id} name={person.name} onClick={deletePerson}>delete</button>
    </div>
  )
}

export default Person