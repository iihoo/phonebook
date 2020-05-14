import React from 'react'
import Group from './Group'

const GroupList = (props) => {
    return props.groups.map(group =>
        <Group key={group.id} group={group} deleteGroup={props.handleGroupDelete} />)
}

const Groups = ({ newGroupName, addGroup, handleGroupNameChange, groups, handleGroupDelete }) => {
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
            <GroupList
                groups={groups} handleGroupDelete={(event) => handleGroupDelete(event)} />
        </div>
    )
}

export default Groups