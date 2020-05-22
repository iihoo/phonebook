import React, { useState, useEffect } from 'react'

import GroupService from './../services/GroupService'
import PersonService from './../services/PersonService'
import Notification from './../components/Notification'

const GroupInfo = ({ group }) => {
    const [message, setMessage] = useState(null)

    const modifyNotification = (text) => {
        setMessage(text)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const onClick = (event) => {
        event.preventDefault()
        const personObject = {
            id: event.target.id,
            name: event.target.name,
            number: event.target.number
        }

        GroupService
            .removePersonFromGroup(group.id, personObject)
            .then(returnedPerson => {
                //setGroup(persons.concat(returnedPersons))
                modifyNotification(`Removed ${returnedPerson.name} from the group`)
            })
            .catch(error => {
                console.log(error)
            })

    }

    const listPersonsOfGroup = () => {
        if (group.persons) {
            return group.persons.map((p) => <li key={p.name}>{p.name} <button id={p.id} onClick={(event) => onClick(event)} name={p.name} number={p.number} >remove from group?</button></li>)
        }
    }

    return (
        <div>
            Group members
            {listPersonsOfGroup()}
            <Notification message={message} />
        </div>
    )
}


const PersonList = ({ group, persons }) => {
    const [message, setMessage] = useState(null)

    const modifyNotification = (text) => {
        setMessage(text)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const onClick = (event) => {
        event.preventDefault()
        const personObject = {
            id: event.target.id,
            name: event.target.name,
            number: event.target.number
        }

        const names = group.persons.map(group => group.name)
        if (names.includes(personObject.name) === false) {
            GroupService
                .addPersonToGroup(group.id, personObject)
                .then(returnedPerson => {
                    //setGroup(persons.concat(returnedPersons))
                    modifyNotification(`Added ${returnedPerson.name}`)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            window.confirm(`Person ${personObject.name} is already added to the group`)
        }

    }

    return (
        <div>
            <Notification message={message} />
            All persons:
            {persons.map((p) => <li key={p.name}>{p.name} <button id={p.id} onClick={(event) => onClick(event)} name={p.name} number={p.number} >add to group?</button></li>)}
        </div>
    )
}

const SingleGroupView = (props) => {
    const [group, setGroup] = useState('')
    const [persons, setPersons] = useState([])

    useEffect(() => {
        GroupService
            .getOne(props.id)
            .then(initialGroup => {
                setGroup(initialGroup)
            })
    }, [group, props.id])

    useEffect(() => {
        PersonService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    return (
        <div>
            <div className="flex-center">
                <h2>Group {group.id}: {group.name}</h2>
            </div>
            <div className="flex-center">
                <GroupInfo group={group} groupPersons={group.persons} />
            </div>
            <br />
            <div className="flex-center">
                <PersonList group={group} persons={persons} />
            </div>
        </div>
    )
}

export default SingleGroupView