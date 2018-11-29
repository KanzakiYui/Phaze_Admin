import React from 'react'
import {Initial, FetchData, Signout} from './google'
class Google extends React.Component{
    constructor(props){
        super(props)
        this.state={
            login: false,
            data: null,
            dataContent: null
        }
    }

    componentDidMount(){
        document.getElementById('google-login').style.display = 'block'
        Initial(()=>this.setState({login: true}))
    }

    componentWillUnmount(){
        document.getElementById('google-login').style.display = 'none'
        Signout()
    }
    componentDidUpdate(prevProps, prevState){
        if(JSON.stringify(prevState.data) !== JSON.stringify(this.state.data) && this.state.data !== null){
            let data = this.state.data
            let content = []
            for(let i=0; i<data.length; i++){
                let TR = []
                for(let j=0; j<data[i].length; j++)
                    TR.push(<td key={j}>{data[i][j]}</td>)
                content.push(<tr key={i}>{TR}</tr>)
            }
            this.setState({
                dataContent: content
            })
        }
    }

    Select = (value)=>{
        if(value.length === 0)
            return
        this.setState({
            data: null,
            dataContent: null
        })
    }

    render(){
        if(!this.state.login)
            return null
        let buttonArray = [
            "Custom Events","Session Track","Session Calculation","Bounce Page Track","Bounce Calculation"
        ]
        let buttonOptions = buttonArray.map((button, index)=><button key={index} onClick={()=>FetchData(button, (data)=>this.setState({data: data}))}>{button}</button>)
        let dropdownArray = [
            '', 'Bylls','Blitzcrypto','Hive Blockchain','Hashchain','360block','NetCents','Glance Technologies','Blockchain Research Institute','Crypto Chicks','Canada Blockchain Group','Blockchain Virtual Dimension','Bitcoin Bay Corp','Toronto Blockchain Ambassadors','Blockchain Education Network','Fast Access Blockchain ','Dominion Bitcoin Mining Company LTD', 'Blockchain mind','Chainsafe','DMG blockchain solutions',
        ]
        let dropdownOptions = dropdownArray.map((dropdown, index)=><option key={index} value={dropdown}>{dropdown}</option>)
        return  <div>
                        <div>
                            {buttonOptions}
                        </div>
                        <div>
                            <select onChange={(event)=>this.Select(event.target.value)}>
                                {dropdownOptions}
                            </select>
                        </div>
                        <table>
                            <tbody>
                                {this.state.dataContent}
                            </tbody>
                        </table>
                    </div>
    }
}

export default Google