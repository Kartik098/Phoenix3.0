//ADD_COMPANY
//DElETE_COMPANY

const ADD_COMPANY = {
    type: 'ADD_COMPANY'
}
const addCompany = (payload)=>{
    return {
        type: 'ADD_TO_CART',
        payload
    }
}

const DElETE_COMPANY ={
    type: 'DElETE_COMPANY'
}

const EDIT_COMPANY ={
    type : "EDIT_COMPANY"
}

export {ADD_COMPANY, addCompany, DElETE_COMPANY, EDIT_COMPANY}