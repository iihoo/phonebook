import React, { useState, useEffect } from 'react'

import Persons from './../components/Persons'
import Groups from './../components/Groups'
import Notification from './../components/Notification'
import PersonService from './../services/PersonService'
import GroupService from './../services/GroupService'

const HomeView = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [groups, setGroups] = useState([])
  const [newGroupName, setNewGroupName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  useEffect(() => {
    GroupService
      .getAll()
      .then(initialGroups => {
        setGroups(initialGroups)
      })
  }, [groups])

  const modifyNotification = (text) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(person => person.name)
    if (names.includes(personObject.name) === false) {
      PersonService
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          modifyNotification(`Added ${newName}`)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      if (window.confirm(`Person ${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        PersonService
          .update(person.id, personObject).then(returnedPerson => {
            setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
            modifyNotification(`${newName}'s number was changed`)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error)
            // ************************************'
            setPersons(persons.filter(p => p.name !== newName))
          })


      }
    }
  }

  const addGroup = (event) => {
    event.preventDefault()
    const groupObject = {
      name: newGroupName,
      persons: []
    }

    const names = groups.map(group => group.name)
    if (names.includes(groupObject.name) === false) {
      GroupService
        .create(groupObject)
        .then(returnedGroups => {
          setGroups(groups.concat(returnedGroups))
          modifyNotification(`Added ${newGroupName}`)
          setNewGroupName('')
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      window.confirm(`Group ${newGroupName} is already added to, try another name`)
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleGroupNameChange = (event) => {
    setNewGroupName(event.target.value)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    const name = event.target.getAttribute('name')
    const id = event.target.getAttribute('id')
    if (window.confirm('Delete ' + name + '?')) {
      PersonService
        .deleteObject(id)
      modifyNotification(`Person ${name} was deleted`)
      setPersons(persons.filter(p => p.name !== name))
    }
  }

  const handleGroupDelete = (event) => {
    event.preventDefault()
    const name = event.target.getAttribute('name')
    const id = event.target.getAttribute('id')
    if (window.confirm('Delete ' + name + '?')) {
      GroupService
        .deleteObject(id)
      modifyNotification(`Group ${name} was deleted`)
      setGroups(groups.filter(p => p.name !== name))
    }
  }

  return (
    <div>
      <div className="flex-center">
        <h2>Phonebook</h2>
      </div>

      <div className="flex-center">
        <Notification message={message} />
      </div>

      <div className="flex-container">
        <div>
          < Persons newName={newName} newNumber={newNumber}
            addPerson={(event) => addPerson(event)}
            handleNameChange={(event) => handleNameChange(event)}
            handleNumberChange={(event) => handleNumberChange(event)}
            persons={persons} handleDelete={(event) => handleDelete(event)} />
        </div>
        <div>
          < Groups newGroupName={newGroupName}
            addGroup={(event) => addGroup(event)}
            handleGroupNameChange={(event) => handleGroupNameChange(event)}
            groups={groups} handleGroupDelete={(event) => handleGroupDelete(event)} />
        </div>
      </div>
    </div>
  )
}


export default HomeView