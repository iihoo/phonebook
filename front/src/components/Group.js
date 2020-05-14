import React from 'react'

const Group = ({ group, deleteGroup }) => {
  return (
    <div>   
      ({group.id}) <b>Group name</b>: {group.name} <button id={group.id} name={group.name} onClick={deleteGroup}>delete</button>
    </div>
  )
}

export default Group