import React from 'react'

const Group = ({ group, deleteGroup }) => {
    return (
        <div>
          ({group.id}) <b>Group name</b>: {group.name} <button id={group.id} name={group.name} onClick={deleteGroup}>delete group?</button>
          {group.persons.map(person => <li key={person.id}>{person.name}</li>)}
        </div>
      )
}

const Groups = ({ newGroupName, addGroup, handleGroupNameChange, groups, handleGroupDelete }) => {

    const groupList = groups.map(group =>
        <Group key={group.id} group={group} deleteGroup={handleGroupDelete} />)

    return (
        <div>
            <h3>Add new group</h3>
            <form onSubmit={addGroup}>
                <div>
                    name: <input value={newGroupName} onChange={handleGroupNameChange} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h3>Groups</h3>
            {groupList}
        </div>
    )
}

export default Groups