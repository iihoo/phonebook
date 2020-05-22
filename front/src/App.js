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
        <div>
          <ul className='navbar'>
            <li><NavLink exact to='/'>Home</NavLink></li>
            <li><NavLink to='/groups'>Groups</NavLink></li>
          </ul>
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
