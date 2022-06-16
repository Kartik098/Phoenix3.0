import React,{ useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import './intakeModal.css'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import "bootstrap/dist/css/bootstrap.min.css";
import 'tippy.js/dist/tippy.css'
import PVModal from './PVModal';
import EVModal from './EVModal';
import DataModal from './dataModal'
import ResilencyModal from './resilencyModal'
import Navbar from '../navbar'
import axios from 'axios'
import { connect } from 'react-redux'
import { ADD_COMPANY, DElETE_COMPANY } from '../../actions/action'
import { DataState } from './dataState'
import dataContext from './dataContext'


function IntakeModal(props){
 
    const [cname, setCname] = useState("");
    const [sitename, setSitename] = useState("");
    const [siteaddress, setSiteaddress] = useState("");
    const [contact_name, setContact_name] = useState("");
    const [category, setCategory] = useState("");
    const [show, setShow] = useState(false);
    const [emailaddress, setEmailaddress] = useState("");
    const [phone_no, setPhone_no] = useState("");
    const [utillityname, setUtillityname] = useState("");
    const [sitetype, setSitetype] = useState([]);
    const [pvdesc, setPvdesc] = useState("");
    const API_HOST = 'http://localhost:8000';
    const data = useContext(dataContext);
    console.log("data"+data);
   
let _csrfToken = null;

async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${API_HOST}/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}
 
 
const PostData2 = async (e) => {  
      // e.preventDefault();
      // setMdShow(false);
      let FormField = new FormData()
      console.log("data value"+data.value)
      FormField.append('loaddata',data.value)
      
      
      await axios({
        method:'post',
        url: 'http://localhost:8000/process_data/',
        data:FormField,
       
        
      }).then((res) => {
        console.log(res.data)
      //  setdata3(res.data)
        console.log(res.data);
        
      })
    }
    

// console.log(props)
// async function testRequest(method) {
//   const response = await fetch(`${API_HOST}/ping/`, {
//     method: method,
//     headers: (
//       method === 'POST'
//         ? {'X-CSRFToken': await getCsrfToken()}
//         : {}
//     ),
//     credentials: 'include',
//   });
//   const data = await response.json();
//   return data.result;
// }


    const history = useNavigate();
    const PostData = async () => {  
      let FormField = new FormData()
      
      FormField.append('cname', cname)
      FormField.append('sitename', sitename)
      FormField.append('siteaddress', siteaddress)
      FormField.append('contact_name', contact_name)
      FormField.append('emailaddress', emailaddress)
      FormField.append('phone_no', phone_no)
      FormField.append('utillityname', utillityname)
      FormField.append('sitetype', sitetype)
      FormField.append('pvdesc', pvdesc)
      FormField.append('category', category )
      await axios({
        method:'post',
        url: 'http://127.0.0.1:8000/CompanyModal/',
        data:FormField,
       
        
      }).then((res) => {
        console.log(res.data)
       
        console.log(res.data);
        history('/view',{ replace:true})
      })
    }
    

    function handlesitetype(event){
     
      setSitetype((oldArray)=>
        [...oldArray, event.target.value]);
    
     console.log(sitetype)
    }
    
    var Options = [
      {
      value: "warehouse"
    },{
      value: "Small Office",
      
    },{
      value: "Medium office",
     
    },{
      value: "Large office",
     
    },{
      value: "Primary school",
     
    },{
      value: "Secondary school",
     
    },{
      value: "Stand-alone retail",
     
    },{
      value: "SuperMarket",
     
    },{
      value: "Strip Mall",
     
    },{
      value: "Full Service Restaurant",
     
    },{
      value: "Quick Service Restaurant",
     
    },{
      value: "Hospital",
     
    },{
      value: "Small Hotel",
     
    },{
      value: "Large Hotel",
     
    },{
      value: "Midrise Apartment",
     
    },{
      value: "Outpatient Health Care",
     
    }]   

   
    useEffect(()=>{
      console.log(data.value)
    },[data])
   return (
    <>    
     <Navbar /><br/>
    
     <h1 className='meter-title'>Add new site +</h1>
       <div className='main-modal'>
      <div className='form-main'>
     {getCsrfToken}
 
    
      <h4 className='info-title'>General-information</h4>
  <Form.Group className="mb-3" >
    <Form.Label>Company Name*</Form.Label>
    <Form.Control type="text" placeholder="e.g Gridscape Solutions" className='formcont' name='cname' value={cname} onChange={(e) => setCname(e.target.value)} required />
    
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Site Name*</Form.Label>
    <Form.Control type="text" placeholder="e.g Gridscape" className='formcont' name='sitename' value={sitename} onChange={(e) => setSitename(e.target.value)}   required/>
    
  </Form.Group>
  <label htmlFor="group14" className='PVEV'>Site type*</label> <br/>
  {[ 'radio'].map((type) => (
         <div key={`inline-${type}`} className="mb-3" >
      <Form.Check
        inline
        label="Non Residential"
        name="group14"
        onChange={()=>{ setShow(true);}}
        checked={show===true}
         value = {true}
         
       
        type={type}
        id={`inline-${type}-3`} required
      />
       <Form.Check
        inline
        label="Residential"
        name="group14"
        onChange={()=>{ setShow(false);}}
        type={type}
        id={`inline-${type}-4`}
         required
      /> 
      </div>
        ))}
         {show ? (<div>
    <label htmlFor='category'>Select Non residential site type</label><br/><br/>
   <select className='site-type2' name='category' value = {category} onChange = {(e) => setCategory(e.target.value)} >
   {
     Options.map((opt) => {
       return <option key={opt.value} value={opt.value}>{opt.value}</option>
        })
   } 
 </select>
 </div>) : null}
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Site Address*</Form.Label>
    <Form.Control name='siteaddress' value={siteaddress} onChange={(e) => setSiteaddress(e.target.value)}  className='formcont' as="textarea" rows={3} pattern='[A-Za-z0-9\.\-\s\,]' placeholder=' 30, 2nd Floor, Bhagat Colony, near Sushan Circle, Makarpura, Vadodara, Gujarat 390010'/>
    
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Contact person*</Form.Label>
    <Form.Control type="text" placeholder="Enter name" name='contact_name' value={contact_name} onChange={(e) => setContact_name(e.target.value)}  className='formcont' maxLength={20} minLength={3} required/>
    <Form.Control.Feedback type="invalid">
    Please enter a valid name 
    </Form.Control.Feedback>
  </Form.Group>
  <InputGroup hasValidation>
  <Form.Group className="mb-3" controlId="validationCustom05" >
    <Form.Label>Email address*</Form.Label>
    
    <Form.Control type="text" placeholder="Enter email" pattern='[^@]+@[^@]+\.[^@]+' className='form-control2' name='emailaddress' value={emailaddress} onChange={(e) => setEmailaddress(e.target.value)}   required />
      <Form.Control.Feedback type="invalid">
    Please enter a valid email address
    </Form.Control.Feedback>
  </Form.Group>
  </InputGroup>
  <Form.Group className="mb-3" >
    <Form.Label>Phone Number</Form.Label>
    <Form.Control type="text" placeholder="(Optional)" className='formcont' minLength={10} maxLength={10} name='phone_no' value={phone_no} onChange={(e) => setPhone_no(e.target.value)} pattern="[0-9]{10}"/>
  </Form.Group>
  <h5 className='info-title'>Utillity Details* <Tippy content='Please refer to your electric bills for this information'><button className='t'>?</button></Tippy></h5>
  <Form.Select aria-label="Default select example" className='Select' name='utillityname' value={utillityname} onChange={(e) => setUtillityname(e.target.value)}  required>
  <option>Select utillity</option>
  <option value="PG & E">PG & E</option>
  <option value="SCE">SCE</option>
  <option value="SDGE">SDGE</option>
  <Form.Control.Feedback type="invalid">
    Please select a valid utillity
    </Form.Control.Feedback>
</Form.Select><br/>
    <DataModal />
 
  <label htmlFor="group1" className='PVEV'>Does the site has existing PV?*</label> <br/>
  
   <PVModal/>
   <h4 className='info-title'>Desired PV Details</h4>
        <label htmlFor="group3">Desired PV types</label>
        {[ 'checkbox'].map((type) => (
         <div key={`inline-${type}`} className="mb-3 checkbox-group required" id="checkbox">
           
      <Form.Check
        inline
        label="Carport"
        name="pv-type"
        value="carpot"
        onChange={handlesitetype}
        type={type}
        id={`inline-${type}-3`}
       
      /> <br/>
       <Form.Check
        inline
        label="Rooftop"
        name="pv-type"
        onChange={handlesitetype}
        
        value="Rooftop"
        type={type}
        id={`inline-${type}-3`}
      /> <br/>
       <Form.Check
        inline
        label="GroundMount"
        name="pv-type"
        onChange={handlesitetype}
        type={type}
        value="GroundMount"
        id={`inline-${type}-3`}
      /> 
      </div>
        ))}
           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Desired PV Description</Form.Label><br/>
    <Form.Text className="text-muted">
      A. Specific locations/areas which are available/not available for PV <br/>B. Priority for the areas/locations that needs to be used
</Form.Text>
    <Form.Control as="textarea" rows={3} name="pvdesc" value={pvdesc} onChange={(e) => setPvdesc(e.target.value)} />
  </Form.Group>
  <label htmlFor="group4" className='PVEV'>Does the site has existing EV?*</label> 
  <EVModal />
  <label htmlFor="group7" className='PVEV'>Do you want to meet resiliency goals?*</label>
  <ResilencyModal />
  <div className='buttons'>
  <Tippy content='Warning!: Your info is not saved if you press cancel all your info will be gone!'><button className='cancel' type='button' >Cancel</button></Tippy>        
          <button className='save'   htmltype="submit" onClick={PostData2}>Save</button> 
        
        </div><br/>
       
</div>
     
        
          
        
     
</div> 
  </>
  )
}





const mapStateToProps = (state) => {

}
const mapDispatchToProps = (dispatch, originalProps)=>{
  console.log(originalProps);
  const addCompany = () =>{
    dispatch(addCompany(originalProps.company))
    
  }
  const deleteCompany =() =>{
    dispatch(DElETE_COMPANY)
  }
  return {
    addCompany,
    deleteCompany
  };
  
}
export default connect(mapStateToProps, mapDispatchToProps)(IntakeModal)
