import React, { useState, useEffect } from 'react'

import GroupService from './../services/GroupService'
import PersonService from './../services/PersonService'
import Notification from './../components/Notification'

const SingleGroupView = (props) => {
    const [group, setGroup] = useState('')
    const [persons, setPersons] = useState([])
    const [message, setMessage] = useState(null)

    useEffect(() => {
        GroupService
            .getOne(props.id)
            .then(initialGroup => {
                setGroup(initialGroup)
            })
    }, [props.id])

    useEffect(() => {
        PersonService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const modifyNotification = (text) => {
        setMessage(text)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const onClickAddToGroup = (event) => {
        const name = event.target.name
        const personId = event.target.id

        const names = group.persons.map(person => person.name)
        if (names.includes(name) === false) {
            GroupService
                .addPersonToGroup(group.id, personId)
                .then(returnedGroup => {
                    setGroup(returnedGroup)
                    modifyNotification(`Added ${name}`)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            window.confirm(`Person ${name} is already added to the group`)
        }
    }

    const onClickRemoveFromGroup = (event) => {
        const name = event.target.name
        const personId = event.target.id

        GroupService
            .removePersonFromGroup(group.id, personId)
            .then(returnedGroup => {
                setGroup(returnedGroup)
                modifyNotification(`Removed ${name} from the group`)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <Notification message={message} />
            <div className="flex-center">
                <h2>Group {group.id}: {group.name}</h2>
            </div>
            <div className="flex-center">
                <div>
                    Group members
                    {group.persons && group.persons.map((person) => 
                        <li key={person.name}>{person.name} <button id={person.id} name={person.name} onClick={(event) => onClickRemoveFromGroup(event)} >remove from group?</button></li>)}
                </div>
            </div>
            <br />
            <div className="flex-center">
                <div>
                    All persons:
                    {persons.map((person) => <li key={person.name}>{person.name} <button id={person.id} name={person.name} onClick={(event) => onClickAddToGroup(event)} >add to group?</button></li>)}
                </div>
            </div>
        </div>
    )
}

export default SingleGroupView