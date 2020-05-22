import React from 'react'
import HomeView from './views/HomeView'
import GroupsView from './views/GroupsView'
import SingleGroupView from './views/SingleGroupView'
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom'
import './index.css'

const App = () => {
  return (
    <div>
      <Router>
        <div className="flex-center">
          <NavLink exact to='/'>Home</NavLink>
          &emsp;
          <NavLink to='/groups'>Groups</NavLink>
        </div>
        <div>
          {/*
          Paths:
            /groups --> show group view
            /groups/id --> show group view for a single group
            ... all other paths --> show home view
          */}
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
