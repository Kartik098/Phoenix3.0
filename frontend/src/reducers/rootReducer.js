const initState = {
    companys:[
        { cname: 'GridScape', sitename: "GridScape Makrpura", siteaddress:"Makarpura", contact_name: "Kartik", emailaddress: "kartik@gridscape.com", phone_no: "9484634082", utillityname: "PGE", category:"Residential"}
    ]
    
}

const rootReducer = (state = initState, action) =>{
    if(state === undefined){
        return {
            companys: [],
            total: 0
        }
    }
    console.log(action.type)
    switch(action.type){
        case 'ADD_COMPANY':
            const company = action.payload;
            const company_name = company.cname;
            const company_sitename = company.sitename;
            const company_siteaddress = company.siteaddress;
            const company_contactname = company.company_name;
            const company_emailaddress = company.emailaddress;
            const company_phoneno = company.phone_no;
            const company_utillityname = company.utillityname;
            const company_category = company.category;
            state.companys.push({company_name, company_sitename, company_siteaddress, company_contactname, company_emailaddress, company_phoneno, company_utillityname, company_category})
            break;
        case 'DELETE_COMPANY':
            //TODO
            break;
        case 'EDIT_COMPANY':
            //TODO
            break;
            return state;
    }
    return state;
}

export default rootReducer