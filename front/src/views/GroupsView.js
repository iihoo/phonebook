import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import SingleGroup from '../components/SingleGroup'
import GroupService from '../services/GroupService'

const ListOfGroups = (props) => {
  return props.groups.map(group =>
    <SingleGroup key={group.id} group={group} />)
}

const GroupView = (props) => {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    GroupService
      .getAll()
      .then(initialGroups => {
        setGroups(initialGroups)
      })
  }, [])

  return (
    <div>
      <div className="flex-center">
        <h2>Groups</h2>
      </div>
      <div className="flex-center">
        <div>
          <ListOfGroups groups={groups} />
        </div>
      </div>
    </div>
  )
}

export default withRouter(GroupView)