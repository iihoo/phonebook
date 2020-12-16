import React, { useState, useEffect } from 'react'

import { withRouter } from 'react-router-dom'
import GroupService from '../services/groupService'

const Person = ({ person }) => {
  return (
    <React.Fragment>
      <tr>
        <td></td>
        <td colSpan="2">{person.name}</td>
      </tr>
    </React.Fragment>
  )
}

const Group = ({ group, onClick }) => {

  const personList = group.persons.map(person =>
    <Person key={person.id} person={person} />)

  return (
    <table>
      <thead>
        <tr>
          <th>id</th><th>group</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{group.id}</td>
          <td><a href='/' onClick={(event) => onClick(event, group.id)}>{group.name}</a></td>
        </tr>
        {personList}
      </tbody>
    </table>
  )
}

const GroupView = (props) => {
  const [groups, setGroups] = useState([])
  
  useEffect(() => {
    GroupService.getAll().then(initialGroups => {
      setGroups(initialGroups)
    })
  }, [])

  const groupList = groups.map(group =>
    <Group key={group.id} group={group} onClick={(event) => onClick(event, group.id)} />)

  const onClick = (event, id) => {
    event.preventDefault()
    props.history.push('/groups/' + id)
  }

  return (
    <div className="flex-container-flex">
      {groupList}
    </div>
  )
}

export default withRouter(GroupView)