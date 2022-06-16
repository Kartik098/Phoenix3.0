import React,{ useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Navbar from '../navbar'
import { connect } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

function CompanyDetail(props) {
  const [company, setCompany] = useState("")
  
  const history = useNavigate();
  var { id }  = useParams();

    const getSingleProduct = async () =>{
    
    const { data } = await axios.get("http://localhost:8000/CompanyModal/" + `${ id }`)
   
    setCompany(data)
   }
   useEffect(()=>{
    getSingleProduct();
   },[])
  return (
    <div>
        <Navbar /><br/><br/>
       
                <div>
                  <h1 className='meter-title'>Company detail</h1>
    <Table responsive="sm">
      <thead>
        <tr>
          
          
          <th>Company name</th>
          <th>Site Name</th>
          <th>Site type</th>
          <th>Site Address</th>
          <th>Contact person</th>
          <th>Email address</th>
          <th>Phone Number</th>
          <th>Utillity</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
      <tr>
         
         
         <td width="190px">{company.cname}</td>
         <td>{company.sitename}</td>
         <td >{company.category}</td>
         <td width="300px">{company.siteaddress}</td>
         <td>{company.contact_name}</td>
         <td>{company.emailaddress}</td>
         <td >{company.phone_no}</td>
         <td>{company.utillityname}</td>
         <td>
         <Button variant="primary" size="md" onClick={()=>{history("/" + company.companyid + "/update/",{ replace:true})}}>
     Edit
    </Button>  <Button variant="danger" size="md" onClick={()=>{axios.delete("http://localhost:8000/CompanyModal/" + `${ id }`);history("/")}}>
     Delete
    </Button></td>
       </tr>
        
      </tbody>
    </Table>
   
    </div>
            
        
    </div>
  )
}
const mapStateToProps = (state) =>{
    return {
        companys: state.companys,
        
    }
}

export default connect(mapStateToProps)(CompanyDetail)