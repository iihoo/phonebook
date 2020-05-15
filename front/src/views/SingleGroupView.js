import React, { useState, useEffect } from 'react'
import GroupService from './../services/GroupService'
import PersonService from './../services/PersonService'


const GroupInfo = ({ id, group }) => {
    if (group !== undefined) {
        const listPersons = group.persons.map((p) => <li key={p.name}>{p.name} <button id={p.id} name={p.name} >add person to group?</button> </li>);
        return (
            <div>
                <h2 >Group {id}: {group.name}</h2>
                Persons in the group:
                {listPersons}
            </div>
        )
    } else {
        return (
            <div>
                <h2>Group {id}:</h2>
            </div>
        )
    }


}

const PersonList = ({ persons }) => {
    if (persons !== undefined) {
        const listPersons = persons.map((p) => <li key={p.name}>{p.name}</li>);
        return (
            <div>
                Persons in phonebook:
                {listPersons}
            </div>
        )
    } else {
        return (
            <div>
                Persons in phonebook:
            </div>
        )
    }
}

const SingleGroupView = (props) => {
    const [group, setGroup] = useState()
    const [persons, setPersons] = useState([])

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

    return (
        <div>
            <GroupInfo id={props.id} group={group} />
            <br/>
            <PersonList persons={persons} />

        </div>
    )
}

export default SingleGroupView