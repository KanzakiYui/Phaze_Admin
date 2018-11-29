import React from 'react'
import './index.css'
import {POSTAPI} from '../../common'

class Promo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            codeError: null,
            code: null,
            linkError: null,
            link: null,
            deleteError: null,
            deleteSuccess: false,
            modifyError: null,
            modifySuccess: false,
        }
    }
    CodeGeneratePreCheck = (event)=>{
        event.preventDefault()
        let code = event.target.elements.code.value
        let cohort = event.target.elements.cohort.value
        let numberOfUsage = Number(event.target.elements.number.value)
        let threshold = Number(event.target.elements.threshold.value)
        let discount = event.target.elements.discount.value
        if(!/^[0-9A-z]+$/g.test(code))
            this.setState({codeError: 'Invalid Code'})
        else if(!/^[0-9, ]+$/g.test(discount))
            this.setState({codeError: 'Invalid Discount'})
        else{
            this.setState({
                codeError: null
            },()=>{
                code = code.toUpperCase()
                cohort = cohort.toUpperCase()
                threshold = threshold * 100
                discount = discount.replace(/\s/g,'').split(',').reverse().map(value=>Number(value)*100)
                discount = '['+discount.join(',')+']'
                this.PostCodeToGenerate(code, cohort, numberOfUsage, threshold, discount)
            })
        }
    }
    PostCodeToGenerate = (code, cohort, number, threshold, discount) =>{
        let body = {
            code: code,
            cohort: cohort,
            numbers: number,
            threshold: threshold,
            discounts: discount
        }
        POSTAPI('admin/add_promo', body).then(()=>{
            this.setState({
                codeError: null,
                code: code
            })
            return
        }).catch(error=>{
            if(error.statusCode === 401)
                this.props.history.push('/')
            else if(error.statusCode === 409)
                this.setState({ codeError: 'Cohort Already Exists!' })
            else if(error.statusCode === 422)
                this.setState({ codeError: error.message })
            else
                this.setState({ codeError: 'Oops... Failed!' })
        })
    }

    LinkGenerate = (event)=>{
        event.preventDefault()
        let code = event.target.elements.code.value
        if(!/^[0-9A-z]+$/g.test(code))
            this.setState({linkError: 'Invalid Code'})
        else{
            code = code.toUpperCase()
            POSTAPI('admin/generate_link', {code: code}).then(link=>{
                this.setState({
                    link: link,
                    linkError: null
                })    
            }).catch(error=>{
                if(error.statusCode === 401)
                    this.props.history.push('/')
                else if(error.statusCode === 409)
                    this.setState({
                        linkError: 'Deep Link Already Exists!'
                    })
                else
                    this.setState({
                        linkError: 'Oops... Failed!'
                    })
            })
        }
    }

    CohortDelete = (event)=>{
        event.preventDefault()
        let element = event.target.elements.cohort
        let cohort = element.value
        if(!/^[0-9A-z]+$/g.test(cohort))
            this.setState({deleteError: 'Invalid Cohort', deleteSuccess: false})
        else{
            cohort = cohort.toUpperCase()
            POSTAPI('admin/delete_promo', {cohort: cohort}).then(()=>{
                element.value = ""
                this.setState({
                    deleteError: null,
                    deleteSuccess: cohort
                })    
            }).catch(error=>{
                if(error.statusCode === 401)
                    this.props.history.push('/')
                else if(error.statusCode === 422)
                    this.setState({
                        deleteError: 'Promo Code Does Not Exist',
                        deleteSuccess: false,
                    })
                else
                    this.setState({
                        deleteError: 'Oops... Failed!',
                        deleteSuccess: false,
                    })
            })
        }
    }

    ModifyCredit = (event)=>{
        event.preventDefault()
        let body = {
            username: event.target.elements.username.value,
            amount: Number(event.target.elements.amount.value)
        }
        POSTAPI('admin/add_credit',body).then(()=>{
            this.setState({
                modifySuccess: true,
                modifyError: null
            })
        }).catch(error=>{
            if(error.statusCode === 401)
                    this.props.history.push('/')
            else if(error.statusCode === 422)
                this.setState({
                    modifyError: error.message,
                    modifySuccess: false,
                })
            else
                this.setState({
                    deleteError: 'Oops... Failed!',
                    modifySuccess: false,
                })
        })
    }
    render(){
        return  <div className='PromoContainer'>
                        <form id='PromoCodeForm' method="POST" onSubmit={(event)=>this.CodeGeneratePreCheck(event)}>
                            <fieldset>
                                <legend>Generate Your Promo Code</legend>
                                <label htmlFor='PromoCode-Code'>Promo Code</label>
                                <input name='code' id='PromoCode-Code' type='text' maxLength='14' placeholder='Numbers and letters only. Max length is 14' required></input>
                                <label htmlFor='PromoCode-Cohort'>Cohort Name</label>
                                <input name='cohort' id='PromoCode-Cohort' type='text' maxLength='30' placeholder='Max length is 30' required></input>
                                <label htmlFor='PromoCode-Number'>Usage Limits</label>
                                <input name='number' id='PromoCode-Number' type='number' min='1' placeholder='Integer only' required></input>
                                <label htmlFor='PromoCode-Threshold'>Threshold</label>
                                <input name='threshold' id='PromoCode-Threshold' type='number' min='1' max='1000' placeholder='Integer only, from 1 to 1000' required></input>
                                <label htmlFor='PromoCode-Discount'>Discount</label>
                                <input name='discount' id='PromoCode-Discount' type='text' placeholder='Use comma to separate numbers' required></input>
                                <p className='Error'>{this.state.codeError}</p>
                                <div className='Buttons'>
                                    <button type='submit'>Generate</button>
                                    <button type='reset'>Reset</button>
                                </div>
                                {this.state.code?<p className='Result'>Generated Code: <span>{this.state.code}</span></p>:null}
                            </fieldset>
                        </form>
                        <form id='PromoLinkForm' method="POST" onSubmit={(event)=>this.LinkGenerate(event)}>
                            <fieldset>
                                <legend>Generate Your Promo Link</legend>
                                <label htmlFor='PromoLink-Code'>Promo Code</label>
                                <input name='code' id='PromoLink-Code' type='text' maxLength='14' placeholder='Numbers and letters only. Max length is 14' required></input>
                                <p className='Error'>{this.state.linkError}</p>
                                <div className='Buttons'>
                                    <button type='submit'>Generate</button>
                                    <button type='reset'>Reset</button>
                                </div>
                                {this.state.link?<p className='Result'>Generated Link: <a href={this.state.link}>{this.state.link}</a></p>:null}
                            </fieldset>
                        </form>
                        <form id='CohortDeleteForm' method="POST" onSubmit={(event)=>this.CohortDelete(event)}>
                            <fieldset>
                                <legend>Delete Your Cohort</legend>
                                <label htmlFor='CohortDelete-Code'>Cohort Name</label>
                                <input name='cohort' id='CohortDelete-Code' type='text' maxLength='30' placeholder='Numbers and letters only. Max length is 30' required></input>
                                <p className='Error'>{this.state.deleteError}</p>
                                <div className='Buttons'>
                                    <button type='submit'>Delete</button>
                                    <button type='reset'>Reset</button>
                                </div>
                                {this.state.deleteSuccess?<p className='Result'>{this.state.deleteSuccess} is <span>Deleted Successfully!</span></p>:null}
                            </fieldset>
                        </form>
                        <form id='ModifyCreditForm' method='POST' onSubmit={(event)=>this.ModifyCredit(event)}>
                            <fieldset>
                                <legend>Modify User Credit</legend>
                                <p>Negative means substract, positive means addition</p>
                                <label htmlFor='Modify-Username'>Username</label>
                                <input name='username' id='Modify-Username' type='text' maxLength='30' placeholder='Max length is 30' required></input>
                                <label htmlFor='Modify-Amount'>Credit Amount</label>
                                <input name='amount' id='Modify-Amount' type='number' step='1' placeholder='Integer only, can be negative'></input>
                                <p className='Error'>{this.state.modifyError}</p>
                                <div className='Buttons'>
                                    <button type='submit'>Modify</button>
                                    <button type='reset'>Reset</button>
                                </div>
                                {this.state.modifySuccess?<p className='Result'><span>Modified Successfully</span></p>:null}
                            </fieldset>
                        </form>
                    </div>
    }
}

export default Promo