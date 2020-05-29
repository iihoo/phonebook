import React from 'react'
import HomeView from './views/HomeView'
import GroupsView from './views/GroupsView'
import PersonsView from './views/PersonsView'
import SingleGroupView from './views/SingleGroupView'
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom'
import './index.css'

const App = () => {
  return (
    <div>
      <Router>
        <div className="topnav">
          <NavLink exact to='/'>Home</NavLink>
          <NavLink to='/groups'>Groups</NavLink>
          <NavLink exact to='/persons'>Persons</NavLink>
        </div>
        <div>
          <Switch>
            <Route exact path='/' render={() =>
              <HomeView />
            } />
            <Route exact path='/groups' render={() =>
              <GroupsView />
            } />
            <Route exact path='/groups/:id' render={({ match }) =>
              <SingleGroupView id={match.params.id} />
            } />
            <Route exact path='/persons' render={() =>
              <PersonsView />
            } />
            <Route path='/' render={() =>
              <Redirect to='/' />
            } />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
