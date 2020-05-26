import React, { useState, useEffect } from 'react'

import { withRouter } from 'react-router-dom'
import GroupService from '../services/GroupService'

const GroupView = (props) => {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    GroupService
      .getAll()
      .then(initialGroups => {
        setGroups(initialGroups)
      })
  }, [])

  const listOfGroups = groups.map(group =>
    <div key={group.id}>
      ({group.id}) <b>Group name</b>: <a href='/' onClick={(event) => onClick(event, group.id)}>{group.name}</a>
      {group.persons.map(person => <li key={person.id}>{person.name}</li>)}
    </div>)

  const onClick = (event, id) => {
    event.preventDefault()
    props.history.push('/groups/' + id)
  }
  
  return (
    <div>
      <div className="flex-center">
        <h2>Groups</h2>
      </div>
      <div className="flex-center">
        <div>
          {listOfGroups}
        </div>
      </div>
    </div>
  )
}

export default withRouter(GroupView)