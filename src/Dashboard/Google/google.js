import AnalyticsQuery from './Query'
import {ClientID, tableID} from'./APIKey'

const Analytics = window.gapi.analytics 
export function Initial (login){
    Analytics.ready(async ()=>{
        console.log('Ready')
        Analytics.auth.authorize({
            clientid: ClientID,
            container: 'google-login',
            userInfoLabel: ''
        })
        Analytics.auth.on('signIn',()=>{
            console.log('Logged in Successfully')
            login()
        })
        Analytics.auth.on('signOut',()=>{
            console.log('Logged out Successfully')
        })
    })
}

export function FetchData(value, storeData){
    let dimensions = AnalyticsQuery[value].dimensions
    let metrics = AnalyticsQuery[value].metrics
    let startDate = AnalyticsQuery[value].startDate
    let endDate = AnalyticsQuery[value].endDate
    window.gapi.client.analytics.data.ga.get({
        'ids': tableID,                                                                                                        
        'dimensions': dimensions,                                                                                    
        'metrics': metrics,                                                                                              
        'start-date': startDate,                                                                                     
        'end-date': endDate,
    }).execute(results =>{
        let array = results.rows
        array.reverse()      
        storeData(array)
    })
}

export function Signout(){
    Analytics.auth.signOut()
}
export default null