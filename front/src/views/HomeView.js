import React, { useState, useEffect } from 'react'
import './../components/Components.css'
import './Views.css'

import Persons from './../components/Persons'
import Groups from './../components/Groups'
import PersonService from '../services/personService'
import GroupService from '../services/groupService'
import Notification from './../components/Notification'

const HomeView = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [groups, setGroups] = useState([])
  const [newGroupName, setNewGroupName] = useState('')

  useEffect(() => {
    PersonService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  useEffect(() => {
    GroupService.getAll().then(initialGroups => {
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
    if (newName === "") {
      window.confirm(`Empty name is not allowed, try another name`)
    } else if (names.includes(personObject.name) === false) {
      PersonService.create(personObject).then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        Notification.modifyNotification(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        console.log(error)
      })
    } else {
      if (window.confirm(`Person ${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        PersonService.update(person.id, personObject).then(returnedPerson => {
          setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
          Notification.modifyNotification(`${newName}'s number was changed`)
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          console.log(error)
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
    if (newGroupName === "") {
      window.confirm(`Empty name is not allowed, try another name`)
    } else if (names.includes(groupObject.name) === false) {
      GroupService.create(groupObject).then(returnedGroups => {
        setGroups(groups.concat(returnedGroups))
        Notification.modifyNotification(`Added ${newGroupName}`)
        setNewGroupName('')
      }).catch(error => {
        console.log(error)
      })
    } else {
      window.confirm(`Group ${newGroupName} is already added to, try another name`)
    }
  }

  const handleFieldValueChange = (event, setFieldValue) => {
    setFieldValue(event.target.value)
  }

  const handleGroupDelete = (event, service, type, setCollection, collection) => {
    event.preventDefault()
    const name = event.target.getAttribute('name')
    const id = event.target.getAttribute('id')
    if (window.confirm('Delete ' + name + '?')) {
      GroupService.deleteObject(id)
      Notification.modifyNotification(`Group ${name} was deleted`)
      setGroups(groups.filter(group => group.name !== name))
    }
  }

  // when person is deleted, backend returns list of groups 
  const handlePersonDelete = (event) => {
    event.preventDefault()
    const name = event.target.getAttribute('name')
    const id = event.target.getAttribute('id')
    if (window.confirm('Delete ' + name + '?')) {
      PersonService.deleteObject(id).then(returnedGroups => {
        setGroups(returnedGroups)
        Notification.modifyNotification(`Person ${name} was deleted`)
        setPersons(persons.filter(person => person.name !== name))
      }).catch(error => {
        console.log(error)
      })
    }
  }

  return (
    <div>
      <div className="flex-container">
        <div>
          <Persons newName={newName} newNumber={newNumber}
            addPerson={(event) => addPerson(event)}
            handleNameChange={(event) => handleFieldValueChange(event, setNewName)}
            handleNumberChange={(event) => handleFieldValueChange(event, setNewNumber)}
            persons={persons} handleDelete={(event) => handlePersonDelete(event)} />
        </div>

        <div>
          <Groups newGroupName={newGroupName}
            addGroup={(event) => addGroup(event)}
            handleGroupNameChange={(event) => handleFieldValueChange(event, setNewGroupName)}
            groups={groups} handleGroupDelete={(event) => handleGroupDelete(event)} />
        </div>
      </div>

      <div id="notification-overlay">
        <div id="notification-text"></div>
      </div>
    </div>
  )
}


export default HomeView