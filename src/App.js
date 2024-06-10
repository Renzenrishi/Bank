import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import Login from './Login'

import Home from './Home'
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
