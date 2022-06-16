import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';

const ShowCompany = () => {
    const [companys, setCompanys] = useState([])

    const getCompanys = async ()=>{
        const res = await axios.get("http://localhost:8000/CompanyModal")
        const data = res.data.results
        console.log(data.results)
        setCompanys(data)
        
    }
    useEffect(()=>{
        getCompanys();
        console.log(companys)
    }, [])
    return (
       <>
       <Navbar/><br/>
       <h1 className='meter-title'>Your Companys</h1><br/><br/>
       <div className='show_companys'>
            
            {
                companys.map((single_company, index)=>(
                    <div className='company_container'>
                        <h4>{single_company.cname}</h4>
                        <p>{single_company.sitename}</p>
                        <p className='address_height'>{single_company.siteaddress}</p>
                        <p>{single_company.contact_name}</p>
                        <p>{single_company.emailaddress}</p>
                        <p>{single_company.phone_no}</p>
                        <a href={"/" + single_company.companyid} className='linkbutton'>Show Details</a>
                        
                        
                        </div>
                ))
            }
        </div></>
    );
};

export default ShowCompany;