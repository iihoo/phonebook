import React from 'react'
import { withRouter } from 'react-router-dom'

const SingleGroup = (props) => {

    const onClick = (event) => {
        event.preventDefault()
        props.history.push('/groups/' + props.group.id)
    }

    return (
        <div>
            ({props.group.id}) <b>Group name</b>: <a href='/' onClick={(event) => onClick(event)}>{props.group.name}</a>
            {props.group.persons.map(person => <li key={person.id}>{person.name}</li>)}
        </div>
    )
}

export default withRouter(SingleGroup)