import React from 'react'
import Person from './Person'
import { withRouter } from 'react-router-dom'

const PersonList = (props) => {
    return props.persons.map(person =>
        <Person key={person.id} person={person} />)
}

const GroupMembers = (props) => {

    const onClick = (event) => {
        event.preventDefault()
        props.history.push('/groups/' + props.group.id)
    }

    return (
        <div>
            (<a href='/' onClick={(event) => onClick(event)}>{props.group.id}</a>) <b>Group name</b>: {props.group.name}
            <PersonList persons={props.group.persons} />
        </div>
    )
}

export default withRouter(GroupMembers)