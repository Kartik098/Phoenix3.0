import React,{useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal' 
import Form from 'react-bootstrap/Form'
import Tippy from '@tippyjs/react'
import "bootstrap/dist/css/bootstrap.min.css";
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import UpdateNewEV from './UpdateNewEV';
// import EVModal2 from './EVModal2';

function UpdateExistingEV(props) {
    
  const [mdShow, setMdShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [EVSelect,setEV] = useState(0);
  const [EVcharge,setCharge] = useState(null);
  const [validated, setValidated] = useState(false);
  const [ no_of_existingevs, setNo_of_existingevs] = useState("");
  const [ no_of_existingevchargers, setNo_of_existingevchargers] = useState("");
  const [existingevdesc, setExistingevdesc] = useState("");
  const [ annual_ev_miles, setAnnual_ev_miles] = useState("")
  const [ annual_fuel_expenditure, setAnnual_fuel_expenditure] = useState("")
  const [ desired_ev_details, setDesired_ev_details] = useState("")
  const [ additionalInformation, setAdditionalInformation] = useState("")
  const [ no_of_req_evchargers , setNo_of_req_evchargers] = useState("")
  const [ charger_type, setCharger_type] = useState("")
  
  

  function getData(val){
    const customtext = document.querySelector(".customtext")
    var att = document.createAttribute("readonly")
    customtext.setAttributeNode(att)
      if(val.target.value === ""){
        const customtext = document.querySelector(".customtext")
        customtext.removeAttribute("readonly")
      }
      else if(!val.target.value === ""){ 
        const customtext = document.querySelector(".customtext")
        
        att.value = true;
        customtext.setAttributeNode(att)
        customtext.value = val.target.value
        
      }
      customtext.value = val.target.value
      setCharge(val.target.value)
      att.value = true;
      
  }
  const loadExistingEVdata = async ()=>{
    const  { data }  = await axios.get('http://127.0.0.1:8000/ExistingEV/' + `${ props.EvID }`)
    setNo_of_existingevs(data.no_of_existingevs)
    setNo_of_existingevchargers(data.no_of_existingevchargers)
    setExistingevdesc(data.existingevdesc)
    setAnnual_ev_miles(data.annual_ev_miles)
    setAnnual_fuel_expenditure(data.annual_fuel_expenditure)
    setDesired_ev_details(data.desired_ev_details)
    setAdditionalInformation(data.additionalInformation)
    setNo_of_req_evchargers(data.no_of_req_evchargers)
    setCharger_type(data.charger_type)
    setCharge(data.EVcharge)
    
  }
  useEffect(()=>{
    loadExistingEVdata();
  })
  const UpdateexistingEVData = async (e) => {  
    e.preventDefault();
    setMdShow(false);
    let FormField = new FormData()
    
    FormField.append('no_of_existingevs',no_of_existingevs)
    FormField.append('no_of_existingevchargers', no_of_existingevchargers)
    FormField.append('existingevdesc', existingevdesc)
    FormField.append('annual_ev_miles', annual_ev_miles)
    FormField.append('annual_fuel_expenditure', annual_fuel_expenditure)
    FormField.append('desired_ev_details', desired_ev_details)
    FormField.append('additionalInformation', additionalInformation)
    FormField.append('no_of_req_evchargers', no_of_req_evchargers)
    FormField.append('charger_type', charger_type)
    FormField.append('EVcharge', EVcharge)


    
    await axios({
      method:'put',
      url: 'http://127.0.0.1:8000/ExistingEV/' + `${ props.EvID }`,
      data:FormField,
     
      
    }).then((res) => {
      console.log(res.data)
     
      console.log(res.data);
      
    })
  }
    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        setMdShow(true)
        event.stopPropagation();
      } else{
        setMdShow(false)
      }
    
      setValidated(true);
     
       
    };
    const handleSubmit2 = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        setSmShow(true)
        event.stopPropagation();
      } else{
        setSmShow(false)
      }
    
      setValidated(true);
     
       
    };
  return (
    <>
       {['radio'].map((type) => (
    <div key={`inline-${type}`} className="mb-3">
      <Form.Check
        inline
        label="Yes"
        name="group4"
        onChange={()=>{ setMdShow(true);setEV(1)}}
        checked={EVSelect===1}
        value="1"
        type={type}
        id={`inline-${type}-5`}
        
      />
       <Form.Check
        inline
        label="No"
        name="group4"
        onChange={()=>{ setSmShow(true);setEV(2)}}
        checked={EVSelect===2}
        value="2" 
        type={type}
        id={`inline-${type}-6`}
       
      /> 
      </div>
  ))}
       <Modal
       
        size="md"
        show={mdShow}
        onHide={() => setMdShow(false)}
        aria-labelledby="example-modal-sizes-title-md"
      >
        <Modal.Header closeButton onClick={()=>setEV(0)}>
          <Modal.Title id="example-modal-sizes-title-md" >
            Existing EV Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className='formev' noValidate validated={validated} onSubmit={handleSubmit}>
           
            <Form.Select aria-label="Default select example" name='no_of_existingevs' value = {no_of_existingevs} onChange = {(e) => setNo_of_existingevs(e.target.value)} required>
                <option>No. of EVs on site:</option>
                <option value="0">0</option>
                <option value="1-5">1-5</option>
                <option value="5-10">5-10</option>
                <option value="20-50">20-50</option>
                <option value="Above 50">Above 50</option>
              </Form.Select><br/>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>No. of existing EV chargers on site</Form.Label>
                <Form.Control type="text" placeholder="No. of EV chargers" name='no_of_existingevchargers' value = {no_of_existingevchargers} onChange = {(e) => setNo_of_existingevchargers(e.target.value)} maxLength="10" minLength="1" required pattern='[0-9]{1,10}'/>  
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Existing EV Description     <Tippy content='Please describe the existing EV system, covering the following information:1. Number of Chargers 2. Type of Charger 3. kW Rating of charger 4. What meter the charger is currently on'><button className='t'>?</button></Tippy>                </Form.Label><br/>
    
    <Form.Control as="textarea" rows={3} name='existingevdesc' value = {existingevdesc} onChange = {(e) => setExistingevdesc(e.target.value)} required />
  </Form.Group>
              {/*  Tooltip  */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>How many miles do those vehicles drive annually?</Form.Label><br/>
                  <Form.Text className="text-muted">
                  Rough Estimates are acceptable
              </Form.Text>
                <Form.Control type="text" maxLength={10} pattern='[0-9]{1,10}' name='annual_ev_miles' value = {annual_ev_miles} onChange = {(e) => setAnnual_ev_miles(e.target.value)} required/>
                
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>What is your annual Fuel Expenditures?</Form.Label>
                
                <Form.Control type="text" maxLength={10} pattern='[0-9]{1,10}' name='annual_fuel_expenditure' value = {annual_fuel_expenditure} onChange = {(e) => setAnnual_fuel_expenditure(e.target.value)} required/>
                
              </Form.Group>
              <h4 className='info-title'>Desired EV Details</h4>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Do they have any plans to convert their fleet to EVs in the next 3-4 years?</Form.Label>
                
                <Form.Control type="text" name='desired_ev_details' value = {desired_ev_details} onChange = {(e) => setDesired_ev_details(e.target.value)} required/>
                
              </Form.Group>
              
                <label htmlFor="pv-desc" className='label'> </label>
              {/*  Tooltip  */}<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Additional Information :  <Tippy content='Please provide any additional information about the site which you feel is relevant.'><button className='t'>?</button></Tippy>                </Form.Label><br/>
    
    <Form.Control as="textarea" rows={3} name='additionalInformation' value = {additionalInformation} onChange = {(e) => setAdditionalInformation(e.target.value)}  required />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>How many EV chargers does your site require?</Form.Label>
                <Form.Control type="text" placeholder="No. of EV chargers" name='no_of_req_evchargers' value = {no_of_req_evchargers} onChange = {(e) => setNo_of_req_evchargers(e.target.value)} required/>  
              </Form.Group>
              <label htmlFor="group7">Charger Type</label>
              <Form.Select aria-label="Default select example" className='Select' onClick={getData} name='charger_type' value = {charger_type} onChange = {(e) => setCharger_type(e.target.value)}>
                <option>Select charger type</option>
                <option value="2.4 kW" >Level 1</option>
                <option value="7.2 kW">Level 2</option>
                <option value="50 kW">DC FC</option>
                <option value="" >Custom</option>
                </Form.Select><br/>
  <Form.Group className="mb-3" >
               
                <Form.Control className='customtext' type="text"  placeholder="kw" defaultValue={EVcharge}  pattern="[1-9]{1,9}" name='EVcharge' value = {EVcharge} onChange = {(e) => setCharge(e.target.value)} required readOnly />
              </Form.Group>
 
              <div className='buttons'>
              <Tippy content='Warning!: Your info is not saved if you press cancel all your info will be gone!'><button className='cancel' type='button' onClick={()=> {setMdShow(false);setEV(0)}}>Cancel</button></Tippy>
         
          <button className='save' type='submit' onClick={UpdateexistingEVData}>Save</button>
        </div>
            </Form>
        </Modal.Body>
      </Modal>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Header closeButton onClick={()=>setEV(0)}>
          <Modal.Title id="example-modal-sizes-title-sm">
            EV details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit2}>
        <label htmlFor="group4" className='PVEV'>Do you want EV Charging system on your site?</label> <br/>
        <UpdateNewEV NewEvID={props.NewEvID}/>
        <div className='buttons'>
        <Tippy content='Warning!: Your info is not saved if you press cancel all your info will be gone!'><button className='cancel' type='button' onClick={()=> {setSmShow(false);setEV(0)}}>Cancel</button></Tippy>
          
          <button className='save' type='button' onClick={()=>{ setSmShow(false);}}>Save</button>
        </div>
        </Form>
        </Modal.Body>
      </Modal>
      
    </>
  )
}

export default UpdateExistingEV
