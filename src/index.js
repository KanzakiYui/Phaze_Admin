import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'

class App extends React.Component{
    render(){
        return  <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/Login" component={Login}/>
                        <Route path="/Dashboard" component={Dashboard} />
                    </Switch>
    }
}
ReactDOM.render(
    <BrowserRouter basename="/app">
            <App/>
    </BrowserRouter>
, 
document.getElementById('root'))