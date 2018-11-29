let CustomEvents = {
    dimensions:  'ga:date, ga:eventCategory, ga:eventAction, ga:eventLabel',
    metrics: 'ga:uniqueEvents',  
    startDate: '15daysAgo',                                                                                      
    endDate: 'today',
    needParse: true,                                        // custom events need parse result, while default events may not need parse
    types: {
        'Login Click': { event: 'Click Login', columns: ['Date', 'Count']},
        'Signup Click': { event: 'Click Sign Up' , columns: ['Date', 'Count']},
        'Logout Click' :  { event: 'Click Log Out' , columns: ['Date', 'Username', 'Count']},
        'Menu Click':  { event: 'Click Menu' , columns: ['Date', 'Username', 'Count']},
        'Menu Option Click':  { event: 'Click Menu Option' , columns: ['Date', 'Option', 'Username', 'Count']},
        'KYC Click':   { event: 'Click KYC' , columns: ['Date', 'Username', 'Count']},
        'Promo Click': { event: 'Click Promo' , columns: ['Date', 'Username', 'Count']},
        'Brand Click':  { event: 'Click Brand' , columns: ['Date', 'Merchant', 'Username', 'Count']},
        'Payment Click': { event: 'Click Payment Method' , columns: ['Date', 'Merchant', 'Payment', 'Username', 'Count']},
        'Pay Attemption':  { event: 'Try to Pay' , columns: ['Date', 'Merchant', 'Payment', 'Amount','Currency', 'Discount', 'Count']},
        'Pay Failure':  { event: 'Pay Failed' , columns: ['Date', 'Merchant', 'Payment', 'Amount','Currency', 'Discount', 'Count']},
        'Pay Success':  { event: 'Pay Successfully' , columns: ['Date', 'Merchant', 'Payment', 'Amount','Currency', 'Discount', 'Count']},
        'Checkout Details Click':  { event: 'Click Details in Checkout', columns: ['Date', 'Count']},
        'Sending Crypto Click': { event: 'Click Send' , columns: ['Date', 'Username', 'Amount', 'Crypto', 'Address', 'Count']},
        'Sending Crypto Failure': { event: 'Send Failed'  , columns: ['Date', 'Username', 'Amount', 'Crypto', 'Address', 'Count']},
        'Forgot Password Click': { event: 'Click Forgot Password', columns: ['Date', 'Count']},
        'Wallet Transactions Details Click':  { event: 'Click Details in Wallet Transactions', columns: ['Date', 'Count']},
        'Orders Snippet Details Click': { event: 'Click Details in Orders' , columns: ['Date', 'Count']},
        'Gift Card Code Failure':  { event: 'Get Code Failed' , columns: ['Date', 'Merchant', 'Payment', 'Amount','Currency', 'Discount', 'Count']},
    }
}

let SessionTrack = {
    dimensions: 'ga:date',                                                                                  
    metrics: 'ga:sessions, ga:sessionDuration, ga:bounces, ga:hits',     
    startDate: '20daysAgo',                                                                                      
    endDate: 'today',
    columns: ['Date', 'Sessions Sum', 'Sessions Duration Sum (s)', 'Bounces Sum', 'Hits Sum' ]
}

let SessionCalculation = {
    dimensions: 'ga:date',                                                                                  
    metrics: 'ga:bounceRate, ga:avgSessionDuration',    
    startDate: '20daysAgo',                                                                                      
    endDate: 'today',
    columns: ['Date', 'Bounce Rate (%)', 'Avg Session Duration (s)' ],
    needRound: [1, 2]
}

let BouncePageTrack = {
    dimensions: 'ga:date, ga:hour, ga:dayOfWeekName, ga:browser, ga:exitPagePath',                                                                                  
    metrics: 'ga:timeOnPage',                                                                                                 
    startDate: '15daysAgo',                                                                                      
    endDate: 'today',
    columns: ['Date', 'Hour', 'Weekday', 'Browser', 'Page Name', 'Duration (s)'],
    needRound: [5],
    needRemoveURL: [4]
}

let BounceCalculation = {
    dimensions: 'ga:date, ga:exitPagePath',                                                                                  
    metrics: 'ga:uniqueEvents',                                                                                                   
    startDate: '15daysAgo',                                                                                      
    endDate: 'today',
    columns: ['Date', 'Page Name', 'Count'],
    needRemoveURL: [1]
}

let AnalyticsQuery = {
    'Custom Events': CustomEvents,
    'Session Track': SessionTrack,
    'Session Calculation': SessionCalculation,
    'Bounce Page Track': BouncePageTrack,
    'Bounce Calculation': BounceCalculation
}
export default AnalyticsQuery