import React from 'react'
import {GetAPI} from '../../common'

class PromoList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: null,
            elementArray: null
        }
    }
    componentDidMount(){
        GetAPI('admin/list_promos').then(result=>{
            let array = JSON.parse(result).map(info=>{
                let code = info.code
                let cohort = info.cohort
                let numberOfCohorts = info.numbers
                let link = info.link?info.link:'Unknown'
                let discount = DiscountArrayParse(info.conditions.discount)
                let threshold = info.conditions.threshold/100
                let numebrs = info.conditions.numbers
                return [code, cohort, numberOfCohorts, link, discount, threshold, numebrs]
            }) 
            array.sort((a, b)=>a[1].localeCompare(b[1]))
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
        let header = [['Code', 'Cohorts', 'Number of Usage', 'Link', 'Discount', 'Threshold', 'Number of Discount']]
        let array = header.concat(this.state.data)
        let csvRows = []
        for(let i=0; i<array.length; i++)
            csvRows.push(array[i].join(','))
        let csvString = csvRows.join("\r\n")
        let a = document.createElement('a')
        a.href = 'data:attachment/csv,' +  encodeURIComponent(csvString)
        a.target = '_blank'
        a.download = 'PromoList.csv'
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
                                <tr><th>Code</th><th>Cohorts</th><th>Number of Usage</th><th>Link</th><th>Discount</th><th>Threshold</th><th>Number of Discount</th></tr>
                            </thead>
                            <tbody style={{textAlign: 'center'}}>
                                {this.state.elementArray}
                            </tbody>
                        </table>
                    </div>
    }
}

export default PromoList


function DiscountArrayParse(array){
    let newArray = []
    for(let i=array.length-1; i>=0; i--)
        newArray.push(array[i]/100)
    return newArray.join(" & ")
}

function GenerateRow(array, index){
    let link = array[3]==='Unknown'?'Unknown':<a href={array[3]} target="_blank">{array[3]}</a>
    return  <tr key={index}>
                    <td>{array[0]}</td>
                    <td>{array[1]}</td>
                    <td>{array[2]}</td>
                    <td>{link}</td>
                    <td>{array[4]}</td>
                    <td>{array[5]}</td>
                    <td>{array[6]}</td>
                </tr>
}