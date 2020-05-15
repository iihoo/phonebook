import React, { useState, useEffect } from 'react'

import Persons from './../components/Persons'
import Groups from './../components/Groups'
import PersonService from './../services/PersonService'
import GroupService from './../services/GroupService'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='message'>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='errorMessage'>
      {message}
    </div>
  )
}

const HomeView = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [groups, setGroups] = useState([])
  const [newGroupName, setNewGroupName] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
  }, [])

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
          setMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`Person ${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        PersonService
          .update(person.id, personObject).then(returnedPerson => {
            setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
            setMessage(
              `${newName}'s number was changed`
            )
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error)
            setMessage(null)
            setErrorMessage(
              `the person ${newName} was already deleted from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            //alert(
            //  `the person ${newName} was already deleted from server`
            //)
            setPersons(persons.filter(p => p.name !== newName))
          })
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      }
      //alert(`${newName} is already added to phonebook`)
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
          setMessage(
            `Added ${newGroupName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewGroupName('')
        })
        .catch(error => {
          setErrorMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
      setMessage(
        `Person ${name} was deleted`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
      setMessage(
        `Group ${name} was deleted`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
        <ErrorMessage message={errorMessage} />
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