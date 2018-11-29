import React from 'react'
import './index.css'
import {CheckAuth, GetAPI} from '../common'
import {Link, Switch, Route} from 'react-router-dom'
import Google from './Google'
import Promo from './Promo'
import PromoList from './PromoList'
import TransactionList from './TransactionList'

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userName: null,
            type: null
        }
    }
    componentDidMount(){
        CheckAuth().then(result=>{
            result = JSON.parse(result)
            this.setState({
                userName: result.username,
                type: result.type
            })
            return null
        }).catch(()=>this.props.history.push('/'))
    }
    Logout = ()=>{
        GetAPI('public/logout').then(()=>{
            this.props.history.push('/')
            return null
        }).catch(()=>{})
    }
    render(){
        if(!this.state.userName || !this.state.type)
            return null
        return  <div>
                        <nav>
                            <Link to='/Dashboard/Google'>Google Analytics</Link><br />
                            <Link to='/Dashboard/Promo'>Promotions</Link><br />
                            <Link to='/Dashboard/PromoList'>Promotion History</Link><br />
                            <Link to='/Dashboard/TransactionList'>Transaction History</Link><br />
                            <a href="" onClick={this.Logout}>Log out</a><br />
                        </nav>
                        <div>
                            <Switch>
                                <Route exact path="/Dashboard/Google" component={Google}/>
                                <Route exact path="/Dashboard/Promo" component={Promo}/>
                                <Route exact path="/Dashboard/PromoList" component={PromoList}/>
                                <Route exact path="/Dashboard/TransactionList" component={TransactionList}/>
                            </Switch>
                        </div>
                    </div>
    }
}
export default Dashboard