import {Switch, Route} from 'react-router-dom'

import './App.css'

import Login from './Login'

import Home from './Home'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
  </Switch>
)

export default App
