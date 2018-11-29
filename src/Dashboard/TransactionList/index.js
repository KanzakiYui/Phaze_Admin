import React from 'react'
import {GetAPI} from '../../common'

class TransactionList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: null,
            elementArray: null
        }
    }
    componentDidMount(){
        GetAPI('admin/list_txns').then(result=>{
            let array = JSON.parse(result).map(info=>{
                let username = info.username
                let brand = info.brand
                let price = Number(info.price)/100
                let fee = Number(info.fee)/100
                let code = info.promo_code?info.promo_code:'None'
                let price_charged = Number(info.price_charged)/100
                let currency = info.currency
                let crypto = info.crypto
                let price_crypto = Number(info.price_crypto)
                let link = info.link
                let time = new Date(info.time).toLocaleDateString('en-ca')
                return [username, brand, price, fee, code, price_charged, currency, crypto, price_crypto, link, time]
            })
            let elementArray = []
            for(let i=0;i<array.length;i++)
                elementArray.push(GenerateRow(array[i], i))
            this.setState({
                data: array,
                elementArray: elementArray
            })
        }).catch(error=>{
            if(error.statusCode === 401)
                this.props.history.push('/')
        })
    }

    Download = ()=>{
        let header = [['Username', 'Brand', 'Price', 'Fee', 'Promo Code', 'Price Charged', 'Currency', 'Crypto', 'Price in Crypto', 'Link', 'Time']]
        let array = header.concat(this.state.data)
        let csvRows = []
        for(let i=0; i<array.length; i++)
            csvRows.push(array[i].join(','))
        let csvString = csvRows.join("\r\n")
        let a = document.createElement('a')
        a.href = 'data:attachment/csv,' +  encodeURIComponent(csvString)
        a.target = '_blank'
        a.download = 'TransactionList.csv'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    render(){
        if (!this.state.data)
            return <h1>Please Wait...</h1>
        return  <div>
                        <button className='download' onClick={this.Download}>Download CSV</button>
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Fee</th>
                                    <th>Promo Code</th>
                                    <th>Price Charged</th>
                                    <th>Currency</th>
                                    <th>Crypto</th>
                                    <th>Price in Crypto</th>
                                    <th>Link</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody style={{textAlign: 'center'}}>
                                {this.state.elementArray}
                            </tbody>
                        </table>
                    </div>
    }
}

export default TransactionList

function GenerateRow(array, index){
    let link = array[9]==='ERROR'?'ERROR':<a href={array[9]} target="_blank">Click Here</a>
    return  <tr key={index}>
                    <td>{array[0]}</td>
                    <td>{array[1]}</td>
                    <td>{array[2]}</td>
                    <td>{array[3]}</td>
                    <td>{array[4]}</td>
                    <td>{array[5]}</td>
                    <td>{array[6]}</td>
                    <td>{array[7]}</td>
                    <td>{array[8]}</td>
                    <td>{link}</td>
                    <td>{array[10]}</td>
                </tr>
}