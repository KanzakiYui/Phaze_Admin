import React from 'react'
import {CheckAuth, POSTAPI} from '../common'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
        this.state={
            checked: false,
            error: null
        }
    }
    componentDidMount(){
        CheckAuth().then(()=>{
            this.props.history.push('/Dashboard')                                         // Need auto-login here
            return null
        }).catch(()=>this.setState({
            checked: true
        }))
    }

    LoginPreCheck = (event)=>{
        event.preventDefault()
        if(this.emailRef.current.value.length === 0){
            this.setState({ error: "Username Required" })
            return
        }
        else if(this.passwordRef.current.value.length===0){
            this.setState({ error: "Password Required" })
            return
        }
        this.setState({error: null}, this.Login)
    }

    Login = ()=>{
        let body={
            username: this.emailRef.current.value,
            password: this.passwordRef.current.value
        }
        POSTAPI('public/login', body).then(response=>{
            this.props.history.push('/Dashboard')
            return null
        }).catch(()=>this.setState({error: "Authentication Failed"}))
    }

    render(){
        if(!this.state.checked)
            return null
        return <div>
                    <p>PHAZE ADMIN</p>
                    <form autoComplete="true" noValidate>
                        <input type="email" placeholder="Admin Username" maxLength='30' ref={this.emailRef}/>
                        <input type="password" placeholder="Admin Password" maxLength='20' ref={this.passwordRef}/>
                        <p>{this.state.error}</p>
                        <button type='submit' onClick={(event)=>this.LoginPreCheck(event)}>LOG IN</button>
                    </form>
                  </div>
    }
}

export default Login