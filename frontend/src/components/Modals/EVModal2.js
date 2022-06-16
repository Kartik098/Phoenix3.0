import React,{ useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Tippy from '@tippyjs/react';
import axios from 'axios';
function EVModal2() {
    const [mdShow, setMdShow] = useState(false);
    const [EVSelect2,setEV2] = useState(0);
    const [EVcharge,setCharge] = useState(null);
    const [validated, setValidated] = useState(false);
    const [ no_of_req_evchargers , setNo_of_req_evchargers] = useState("")
    const [ charger_type, setCharger_type] = useState("")
    const [ visiting_vehicles, setVisiting_vehicles] = useState("")
    
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
    const PostData = async (e) => {  
      e.preventDefault();
      setMdShow(false);
      let FormField = new FormData()
      
   
      FormField.append('no_of_req_evchargers', no_of_req_evchargers)
      FormField.append('charger_type', charger_type)
      FormField.append('EVcharge', EVcharge)
      FormField.append('visiting_vehicles', visiting_vehicles)
  
      
      await axios({
        method:'post',
        url: 'http://127.0.0.1:8000/new_ev_details/',
        data:FormField,
       
        
      }).then((res) => {
        console.log(res.data)
       
        console.log(res.data);
        
      })
    }
    const handleSubmit = (event) => {
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
  return (
    <>
        {['radio'].map((type) => (
    <div key={`inline-${type}`} className="mb-3">
      <Form.Check
        inline
        label="Yes"
        onChange={()=>{ setMdShow(true);setEV2(1)}}
        checked={EVSelect2===1}
        value="1"
        name="group6"
        type={type}
        id={`inline-${type}-8`}
        required
      />
       <Form.Check
        inline
        label="No"
        name="group6"
        type={type}
        id={`inline-${type}-7`}
      /> 
      </div>
  ))}
      <Modal
        size="md"
        show={mdShow}
        onHide={() => setMdShow(false)}
        aria-labelledby="example-modal-sizes-title-md"
        centered
      >
        <Modal.Header closeButton onClick={()=> setEV2(0)}>
          <Modal.Title id="example-modal-sizes-title-md">
            EV Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form  noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>How many EV chargers does your site require?</Form.Label>
                <Form.Control type="text" placeholder="No. of EV chargers"  name='no_of_req_evchargers' value = {no_of_req_evchargers} onChange = {(e) => setNo_of_req_evchargers(e.target.value)}  required/>  
              </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Daily Visiting vehicles</Form.Label><br/>
                  <Form.Text className="text-muted">
                  Rough Estimates are acceptable
              </Form.Text>
                <Form.Control type="text"  name='visiting_vehicles' value = {visiting_vehicles} onChange = {(e) => setVisiting_vehicles(e.target.value)} required/>
                
              </Form.Group>
              <label htmlFor="group7">Charger Type</label>
              <Form.Select aria-label="Default select example" className='Select'  name='charger_type' value = {charger_type} onChange = {(e) => setCharger_type(e.target.value)} onClick={getData}>
                <option>Select charger type</option>
                <option value="2.4 kW" >Level 1</option>
                <option value="7.2 kW">Level 2</option>
                <option value="50 kW">DC FC</option>
                <option value="" >Custom</option>
                </Form.Select><br/>
  <Form.Group className="mb-3" >
               
                <Form.Control className='customtext' type="text"  placeholder="kw" defaultValue={EVcharge} pattern="[1-9]{1,9}" required readOnly />
              </Form.Group>
  <div className='buttons'>
  <Tippy content='Warning!: Your info is not saved if you press cancel all your info will be gone!'><button className='cancel' type='button' onClick={()=> {setMdShow(false);setEV2(0)}}>Cancel</button></Tippy>
          
          <button className='save' type='submit' onClick={PostData}>Save</button>
        </div>
        
            </Form>
            </Modal.Body>
      </Modal>
    </>
  )
}

export default EVModal2