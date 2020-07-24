import React, { useState, useEffect } from 'react'
import './../components/Components.css'

import GroupService from './../services/GroupService'
import PersonService from './../services/PersonService'
import Notification from './../components/Notification'

const SingleGroupView = (props) => {
    const [group, setGroup] = useState('')
    const [persons, setPersons] = useState([])
    const [ready, setReady] = useState(false)

    useEffect(() => {
        GroupService.getOne(props.id).then(initialGroup => {
            setGroup(initialGroup)
            setReady(true)
        })
    }, [props.id, ready])

    useEffect(() => {
        PersonService.getAll().then(initialPersons => {
            setPersons(initialPersons)
        })
    }, [])

    const onClickAddToGroup = (event) => {
        const name = event.target.name
        const personId = event.target.id

        const names = group.persons.map(person => person.name)
        if (names.includes(name) === false) {
            GroupService.addPersonToGroup(group.id, personId).then(returnedGroup => {
                setGroup(returnedGroup)
                Notification.modifyNotification(`Added ${name}`)
            }).catch(error => {
                console.log(error)
            })
        } else {
            window.confirm(`Person ${name} is already added to the group`)
        }
    }

    const onClickRemoveFromGroup = (event) => {
        const name = event.target.name
        const personId = event.target.id

        GroupService.removePersonFromGroup(group.id, personId).then(returnedGroup => {
            setGroup(returnedGroup)
            Notification.modifyNotification(`Removed ${name} from the group`)
        }).catch(error => {
            console.log(error)
        })
    }

    // all persons in the group
    const groupPersons = () => {
        if (group.persons) {
            return (group.persons.map(person =>
                <React.Fragment key={person.id}>
                    <tr>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td><button className="button" id={person.id} name={person.name} onClick={(event) => onClickRemoveFromGroup(event)} >remove</button></td>
                    </tr>
                </React.Fragment>))
        }
    }

    // all persons in the system
    const personList = persons.map(person =>
        <React.Fragment key={person.id}>
            <tr>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td><button className="button" id={person.id} name={person.name} onClick={(event) => onClickAddToGroup(event)} >add to group</button></td>
            </tr>
        </React.Fragment>)

    if (ready === false) {
        return null
    } else if (ready === true && !group) {
        return (
            <div>
                No such group exists!
            </div>
        )
    } else {


        return (
            <div>
                <div className="grid-container">
                    <h2>Group {group.id}: {group.name}</h2>
                </div>

                <div className="grid-container">
                <h3>Persons in the group</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th><th>name</th><th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupPersons()}
                        </tbody>
                    </table>
                </div>
                <div className="grid-container">
                    <h3>All persons</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th><th>name</th><th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personList}
                        </tbody>
                    </table>
                </div>
                <div id="notification-overlay">
                    <div id="notification-text"></div>
                </div>
            </div>
        )
    }
}

export default SingleGroupView