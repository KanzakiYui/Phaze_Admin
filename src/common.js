import requestPromise from 'request-promise'
let API = "https://phazeadmin-218216.appspot.com/api/"
export function GetAPI(url){
    return requestPromise({
        method: 'GET',  
        url: API+url, 
        withCredentials: true
    })
}

export function POSTAPI(url, body){
    return requestPromise({
        method: 'POST',  
        url: API+url, 
        body: body, 
        json: true, 
        withCredentials: true,
    })
}

export function CheckAuth(){
    return requestPromise({
        method: 'GET',  
        url: API+'users/check_auth', 
        withCredentials: true
    })
}
